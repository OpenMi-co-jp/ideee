import { Header } from '@/pages-layout/Header'
import { Footer } from '@/pages-layout/Footer'
import type { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
