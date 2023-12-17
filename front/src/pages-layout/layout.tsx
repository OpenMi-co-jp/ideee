import { Header } from '@/pages-layout/Header'
import { Footer } from '@/pages-layout/Footer'
import type { ReactNode } from 'react'
import { Container } from '@mantine/core'
import { useCurrentUser } from '@/context/CurrentUserContext'

export default function Layout({ children }: { children: ReactNode }) {
  const { currentUser } = useCurrentUser()

  return (
    <>
      <Header currentUser={currentUser} />
      <Container mt="7rem" mb="2rem">
        <main>{children}</main>
      </Container>
      <Footer />
    </>
  )
}
