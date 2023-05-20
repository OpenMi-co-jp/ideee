import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { ApolloBaseProvider } from '@/lib/apollo'

import { CustomMantineProvider } from '../lib/mantine/CustomMantineProvider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <ApolloBaseProvider>
        <CustomMantineProvider>
          <Component {...pageProps} />
        </CustomMantineProvider>
      </ApolloBaseProvider>
    </Layout>
  )
}
