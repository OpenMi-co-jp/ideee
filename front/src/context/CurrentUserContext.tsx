import React, { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

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

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser && storedUser !== 'undefined') {
      setCurrentUser(JSON.parse(storedUser))
    }
  }, [])

  const storeCurrentUser = (user: CurrentUserProps) => {
    setCurrentUser(user)
    localStorage.setItem('currentUser', JSON.stringify(user))
  }

  const clearCurrentUser = () => {
    setCurrentUser(null)
    localStorage.removeItem('currentUser')
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, storeCurrentUser, clearCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export function useCurrentUser() {
  return useContext(CurrentUserContext)
}
