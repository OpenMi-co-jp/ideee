import { Container, Space, Box } from '@mantine/core'
import { useState } from 'react'
import { useLoggedIn } from '@/components/loginContext'
import {
  Introduction,
  Merits,
  Description,
  SignInInvitation,
} from '@/components/about'
import { ColorsComponent } from '@/components/footDesignComponent/colorsComponent'

const AboutPage = () => {
  const loggedIn = useLoggedIn()
  const [LSLoggedIn] = useState(false)

  return (
    <Container my="6rem">
      <Introduction />
      <Space my="4rem" />
      <Merits />
      <Description />

      {(!loggedIn || !LSLoggedIn) && <SignInInvitation />}

      <ColorsComponent />
    </Container>
  )
}

export default AboutPage
