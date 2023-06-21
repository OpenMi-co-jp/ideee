import { Header } from '@/pages-layout/Header'
import { Footer } from '@/pages-layout/Footer'
import type { ReactNode } from 'react'
import { Container } from '@mantine/core'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Container mt="7rem" mb="2rem">
        <main>{children}</main>
      </Container>
      <Footer />
    </>
  )
}
