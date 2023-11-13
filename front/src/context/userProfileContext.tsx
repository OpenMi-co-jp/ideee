import React, { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import type { GetUserQuery } from '@/lib/generated/client'

export const UserContext = createContext({} as GetUserQuery['user'] | undefined)

type UserProviderProps = {
  children: ReactNode
  user: GetUserQuery['user'] | undefined
}

export function UserProvider({ children, user }: UserProviderProps) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export function useUser() {
  return useContext(UserContext)
}
