import React, { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import type { GetIdeaQuery } from '@/lib/generated/client'

export const IdeaContext = createContext({} as GetIdeaQuery['idea'])

type IdeaProviderProps = {
  children: ReactNode
  idea: GetIdeaQuery['idea']
}
export function IdeaProvider({ children, idea }: IdeaProviderProps) {
  return <IdeaContext.Provider value={idea}>{children}</IdeaContext.Provider>
}

export function useIdea() {
  return useContext(IdeaContext)
}
