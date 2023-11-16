import { useState, useEffect } from 'react'
import { Container, Space } from '@mantine/core'
import { useLoggedIn } from '@/components/loginContext'
import {
  Introduction,
  Merits,
  Description,
  SignInInvitation,
} from '@/components/about'
import { ColorsComponent } from '@/components/footDesignComponent/colorsComponent'

const AboutPage = () => {
  const { loggedIn } = useLoggedIn()
  const [LSLoggedIn, setLSLoggedIn] = useState(false)

  useEffect(() => {
    try {
      setLSLoggedIn(localStorage.getItem('loggedIn') === 'true')
    } catch (e) {
      console.error(e)
    }
  }, [])

  return (
    <Container my="6rem">
      <Introduction />
      <Space my="4rem" />
      <Merits />
      <Description />

      {!(loggedIn || LSLoggedIn) && <SignInInvitation />}

      <ColorsComponent />
    </Container>
  )
}

export default AboutPage
