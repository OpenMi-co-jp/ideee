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
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUserProps | null>>
}

export const CurrentUserContext = createContext<CurrentUserContextType>({
  currentUser: null,
  setCurrentUser: () => {},
})

type CurrentUserProviderProps = {
  children: ReactNode
}

export function CurrentUserProvider({ children }: CurrentUserProviderProps) {
  const [currentUser, setCurrentUser] = useState<CurrentUserProps | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    setCurrentUser(
      storedUser && storedUser !== 'undefined' ? JSON.parse(storedUser) : null
    )
  }, [])

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
  }, [currentUser])

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export function useCurrentUser() {
  return useContext(CurrentUserContext)
}
