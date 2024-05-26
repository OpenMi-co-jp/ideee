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
import { GoogleAnalytics } from '@/lib/analytics/GoogleAnalytics'
import { useHandleRouteChange } from '@/utils/hooks/useHandleRouteChange'

const App: CustomAppPage = ({ Component, pageProps }) => {
  const router = useRouter()
  useHandleRouteChange()

  const getLayout =
    Component.getLayout ||
    ((page) => {
      return page
    })
  const isCustomOgpPage = /^\/ideas\/|^\/users\//.test(router.pathname)

  return (
    <>
      {!isCustomOgpPage && <HeadBlock />}
      <GoogleAnalytics />
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
