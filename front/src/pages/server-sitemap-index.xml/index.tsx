import { getServerSideSitemapIndexLegacy } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL + '/graphql',
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

export async function generateUserIds() {
  const { data } = await client.query({
    query: gql`
      query GetUserIds {
        userIds {
          ids
        }
      }
    `,
  })
  return data.userIds.ids
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const [ideaIds, userIds] = await Promise.all([
    generateIdeasIds(),
    generateUserIds(),
  ])

  const ideaPaths = ideaIds.map((id: string) => `/ideas/${id}`)
  const userPaths = userIds.map((id: string) => `/users/${id}`)
  const allPaths = [...ideaPaths, ...userPaths]

  return getServerSideSitemapIndexLegacy(
    ctx,
    allPaths.map((loc: string) => process.env.NEXT_PUBLIC_FRONT_URL + loc)
  )
}

export default function SitemapIndex() {}
