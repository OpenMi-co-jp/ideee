import Cookies from 'js-cookie'
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import type { ReactNode } from 'react'
import { useRefetchAuthToken } from '@/utils/auth/useRefetchAuthToken'
import { useSignOut } from '@/components/Auth/SignOut/hooks'
import { Router } from 'next/router'

export type CurrentUserProps = {
  id: number
  name: string
  image: string | null
  defined: boolean | null
}

export type CurrentUserContextType = {
  currentUser: CurrentUserProps | null
  storeCurrentUser: (user: CurrentUserProps) => void
  clearCurrentUser: () => void
}

export const CurrentUserContext = createContext<CurrentUserContextType>({
  currentUser: null,
  storeCurrentUser: () => {},
  clearCurrentUser: () => {},
})

type CurrentUserProviderProps = {
  children: ReactNode
}

// NOTE:
// 本当は currentUser の useState の初期化時に localStorage から値を設定したい
// ただ、 localStorage を useState で使ってしまうとハイドレーションエラーが発生する (SSR では localStorage が使えないので)
// なので useEffect の特性を利用して、ハイドレーションエラーを回避しつつ、この Provider の初期化時に currentUser を設定するようにしている
export function CurrentUserProvider({ children }: CurrentUserProviderProps) {
  const [currentUser, setCurrentUser] = useState<CurrentUserProps | null>(null)
  const [loading, setLoading] = useState(true) // ローディング状態を追加
  const refetchAuthToken = useRefetchAuthToken()
  const { forceSignOut } = useSignOut()

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser && storedUser !== 'undefined') {
      setCurrentUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const checkSignInStatus = useCallback(() => {
    // FIXME: authTokenの期限が切れてからだけでなく、期限が切れる少し前にもrefetchしたほうがUX的にはよいため、よい方法があれば修正してください。
    if (!!currentUser && !Cookies.get('authToken')) {
      refetchAuthToken().then(async (isFetched: boolean) => {
        if (!isFetched) {
          await forceSignOut()
          // FIXME: clearCurrentUserはforceSignOut内で処理したかったですが、なぜか呼ばれないのでここで呼び出しています。解決法がわかれば修正してください。
          clearCurrentUser()
        }
      })
    }
  }, [currentUser, refetchAuthToken, forceSignOut])

  // 初期表示時、リロード時用
  useEffect(() => {
    // NOTE: タイミングによってはcurrentUserが設定されていない場合があるため
    if (!currentUser) return

    checkSignInStatus()
    // NOTE: checkSignInStatusにも依存すると何度も実行されてしまうため、checkSignInStatusは依存配列に含めない
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  // 画面遷移時用
  useEffect(() => {
    Router.events.on('routeChangeComplete', checkSignInStatus)

    return () => {
      Router.events.off('routeChangeComplete', checkSignInStatus)
    }
  }, [checkSignInStatus])

  const storeCurrentUser = useCallback((user: CurrentUserProps) => {
    setCurrentUser(user)
    localStorage.setItem('currentUser', JSON.stringify(user))
  }, [])

  const clearCurrentUser = () => {
    setCurrentUser(null)
    localStorage.removeItem('currentUser')
    Cookies.remove('authToken')
  }

  if (loading) return null

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, storeCurrentUser, clearCurrentUser }}
    >
      {children}
    </CurrentUserContext.Provider>
  )
}

export function useCurrentUser() {
  return useContext(CurrentUserContext)
}
