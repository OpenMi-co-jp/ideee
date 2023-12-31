import { Container, Space } from '@mantine/core'
import { useCurrentUser } from '@/context/CurrentUserContext'
import {
  Introduction,
  Merits,
  Description,
  SignInInvitation,
} from '@/components/about'
import { ColorsComponent } from '@/components/footDesignComponent/colorsComponent'

function AboutPage() {
  const { currentUser } = useCurrentUser()

  return (
    <Container my="6rem">
      <Introduction />
      <Space my="4rem" />
      <Merits />
      <Description />

      {!currentUser && <SignInInvitation />}

      <ColorsComponent />
    </Container>
  )
}

export default AboutPage
