import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/pages-layout/layout'
import { ApolloBaseProvider } from '@/lib/apollo'
import { LoginProvider } from '@/components/loginContext'
import { CustomMantineProvider } from '@/lib/mantine/CustomMantineProvider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LoginProvider>
      <ApolloBaseProvider>
        <CustomMantineProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CustomMantineProvider>
      </ApolloBaseProvider>
    </LoginProvider>
  )
}
