import React, { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import type { GetUserDataQuery } from '@/lib/generated/client'

export const UserContext = createContext({} as GetUserDataQuery['user'])

type UserDataProviderProps = {
  children: ReactNode
  user: GetUserDataQuery['user'];
}

export function UserDataProvider({ children, user }: UserDataProviderProps) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export function useUser() {
  return useContext(UserContext)
}
