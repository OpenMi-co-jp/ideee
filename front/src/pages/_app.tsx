import '@/styles/globals.css'
import '@mantine/core/styles.css'
import type { CustomAppPage } from 'next/app'
import Layout from '@/pages-layout/layout'
import { ApolloBaseProvider } from '@/lib/apollo'
import { CurrentUserProvider } from '@/context/CurrentUserContext'
import { CustomMantineProvider } from '@/lib/mantine/CustomMantineProvider'
import { HeadBlock } from '@/pages-layout/Head'
import { Analytics } from '@vercel/analytics/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import * as gtag from '@/lib/analytics/gtag'

const App: CustomAppPage = ({ Component, pageProps }) => {
  const router = useRouter()
  useEffect(() => {
    const handleRouterChange = (url: any) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouterChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouterChange)
    }
  }, [router.events])

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
