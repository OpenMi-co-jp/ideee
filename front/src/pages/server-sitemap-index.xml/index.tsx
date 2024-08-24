import { getServerSideSitemapIndex } from 'next-sitemap'
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

  paths.push({
    loc: '/ideas',
    changefreq: 'weekly',
    priority: 0.7,
  });
  const sitemapIndex = await getServerSideSitemapIndex(paths);

  ctx.res.setHeader('Content-Type', 'application/xml');
  ctx.res.write(sitemapIndex);
  ctx.res.end();

  return {
    props: {},
  }
}

export default function SitemapIndex() {}