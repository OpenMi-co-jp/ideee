import React, { createContext, useState, useContext } from 'react'
import type { FC, ReactNode } from 'react'

export type LoginContextType = {
  loggedIn: Boolean
  setLoggedIn: React.Dispatch<React.SetStateAction<Boolean>>
}

const LoginContext = createContext<LoginContextType | undefined>(undefined)

export const LoginProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<Boolean>(false)

  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </LoginContext.Provider>
  )
}

export const useLoggedIn = () => {
  const context = useContext(LoginContext)
  if (context === undefined) {
    throw new Error('useLogin must be used within a LoginProvider')
  }
  return context
}
