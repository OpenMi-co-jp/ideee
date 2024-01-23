import '@/styles/globals.css'
import '@mantine/core/styles.css'
import type { CustomAppPage } from 'next/app'
import Layout from '@/pages-layout/layout'
import { ApolloBaseProvider } from '@/lib/apollo'
import { CurrentUserProvider } from '@/context/CurrentUserContext'
import { CustomMantineProvider } from '@/lib/mantine/CustomMantineProvider'
import { HeadBlock } from '@/pages-layout/Head'
import { Analytics } from '@vercel/analytics/react'

const App: CustomAppPage = ({ Component, pageProps }) => {
  const getLayout =
    Component.getLayout ||
    ((page) => {
      return page
    })
  return (
    <>
      <HeadBlock />
      <CurrentUserProvider>
        <ApolloBaseProvider>
          <CustomMantineProvider>
            <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
          </CustomMantineProvider>
        </ApolloBaseProvider>
      </CurrentUserProvider>
      <Analytics />
    </>
  )
}

export default App
