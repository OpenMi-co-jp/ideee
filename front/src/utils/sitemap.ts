import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL + '/graphiql',
  cache: new InMemoryCache(),
})

export async function generateIdeasIds() {
  const { data } = await client.query({
    query: gql`
      query GetIdeaIds {
        ideaIds {
          ids
        }
      }
    `,
  })
  return data.ideaIds.ids
}
