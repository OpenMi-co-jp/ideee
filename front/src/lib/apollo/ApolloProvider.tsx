import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client'
import type { FC, ReactNode } from 'react'
import { setContext } from '@apollo/client/link/context'
import Cookies from 'js-cookie'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL + 'graphql',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from Cookies if it exists
  const authorization = Cookies.get('authToken')

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      // authorization: token ? `Bearer ${token}` : '',
      authorization: authorization || '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export const ApolloBaseProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
