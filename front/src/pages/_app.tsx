import '@/styles/globals.css'
import type { CustomAppPage } from 'next/app'
import Layout from '@/pages-layout/layout'
import { ApolloBaseProvider } from '@/lib/apollo'
import { LoginProvider } from '@/components/loginContext'
import { CustomMantineProvider } from '@/lib/mantine/CustomMantineProvider'

const App: CustomAppPage = ({ Component, pageProps }) => {
  const getLayout =
    Component.getLayout ||
    ((page) => {
      return page
    })
  return (
    <LoginProvider>
      <ApolloBaseProvider>
        <CustomMantineProvider>
          <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
        </CustomMantineProvider>
      </ApolloBaseProvider>
    </LoginProvider>
  )
}

export default App
