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
  logIn: (user: CurrentUserProps) => void
  logOut: () => void
}

export const CurrentUserContext = createContext<CurrentUserContextType>({
  currentUser: null,
  logIn: () => {},
  logOut: () => {},
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

  const logIn = (user: CurrentUserProps) => {
    setCurrentUser(user)
    localStorage.setItem('currentUser', JSON.stringify(user))
  }

  const logOut = () => {
    setCurrentUser(null)
    localStorage.setItem('currentUser', 'null')
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, logIn, logOut }}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export function useCurrentUser() {
  return useContext(CurrentUserContext)
}
