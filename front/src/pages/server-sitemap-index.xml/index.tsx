import { getServerSideSitemapIndexLegacy } from 'next-sitemap'
import { GetServerSideProps } from 'next'
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const ideaPaths = await generateIdeasIds();
  const paths = ideaPaths.map((id: string) => ({
    loc: `/ideas/${id}`,
    changefreq: 'weekly',
    priority: 0.7,
  }));

  return getServerSideSitemapIndexLegacy(ctx, paths.map(
    (item: { loc: string }) => process.env.NEXT_PUBLIC_FRONT_URL + item.loc
  ));
}

export default function SitemapIndex() {}