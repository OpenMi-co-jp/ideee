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
import * as gtag from '@/lib/analytics/gtag'
import { GoogleAnalytics } from '@/lib/analytics/GoogleAnalytics'
import { LOGIN_URL, SIGNUP_URL } from '@/utils/constant'
import { useEffect } from 'react'

const App: CustomAppPage = ({ Component, pageProps }) => {
  const router = useRouter()
  const currentUser = localStorage.getItem('currentUser')

  useEffect(() => {
    const handleRouterChange = (url: any) => {
      gtag.pageview(url)

      // ログイン後に元のいた場所にリダイレクトされる設定
      if (!currentUser && url !== LOGIN_URL && url !== SIGNUP_URL) {
        sessionStorage.setItem('previousPage', url || '/')
      }
    }
    router.events.on('routeChangeComplete', handleRouterChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouterChange)
    }
  }, [router.events, currentUser])

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
