import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import type { FC, ReactNode } from 'react'

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL,
  cache: new InMemoryCache(),
})

export const ApolloBaseProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
