import React, { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import type { GetUserQuery } from '@/lib/generated/client'

export const UserProfileContext = createContext({} as GetUserQuery['user'] | undefined)

type UserProviderProps = {
  children: ReactNode
  user: GetUserQuery['user'] | undefined
}

export function UserProvider({ children, user }: UserProviderProps) {
  return <UserProfileContext.Provider value={user}>{children}</UserProfileContext.Provider>
}

export function useUser() {
  return useContext(UserProfileContext)
}
