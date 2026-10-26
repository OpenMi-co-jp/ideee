import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { showSuccess } from '@/components/showNotification'
import Cookies from 'js-cookie'
import { LoadingOverlay } from '@mantine/core'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { DecodeJwt } from '@/utils/auth'
import client from '@/utils/auth/client'
import { useFetchCsrfToken } from '@/utils/auth/useFetchCsrfToken'

// NOTE: トークンを URL に載せると履歴・アクセス解析・エラー監視に残るため、
//       OAuth でログインした API のセッションから /auth_token で取得する。
//       API 側の切り替え前（?token= でリダイレクトされる場合）にも対応している。
function AuthCallback() {
  const { storeCurrentUser } = useCurrentUser()
  const router = useRouter()
  const csrfToken = useFetchCsrfToken()
  const handled = useRef(false)

  useEffect(() => {
    if (!router.isReady || handled.current) return

    const legacyToken = router.query.token
    if (!legacyToken && !csrfToken) return
    handled.current = true

    const fetchToken = async (): Promise<string | undefined> => {
      if (legacyToken) return String(legacyToken)

      const response = await client.post(
        '/auth_token',
        { authenticity_token: csrfToken },
        { headers: { 'X-CSRF-Token': csrfToken } }
      )
      return response.headers['authorization']
    }

    fetchToken()
      .then((token) => {
        if (!token) throw new Error('auth token is missing')

        Cookies.set('authToken', String(token), {
          expires: 7,
          secure: true,
          sameSite: 'lax',
        })
        storeCurrentUser(DecodeJwt(String(token)))

        const previousPage = sessionStorage.getItem('previousPage') || '/'
        return router.replace(previousPage).then(() => {
          sessionStorage.removeItem('previousPage')
          showSuccess({
            action: 'ログイン',
          })
        })
      })
      .catch((error) => {
        console.error('Failed to sign in:', error)
        router.replace('/users/sign_in')
      })
  }, [router, csrfToken, storeCurrentUser])

  return (
    <LoadingOverlay
      loaderProps={{ size: 'sm', color: 'gray', variant: 'bars' }}
      overlayProps={{ opacity: 0.3, color: '#c5c5c5' }}
      visible
    />
  )
}

export default AuthCallback
