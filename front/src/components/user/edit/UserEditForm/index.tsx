import { Container, Image } from '@mantine/core'
import { Form } from './UserEditForm'

export const UserEditForm = () => {
  return (
    <Container size="md">
      <Image
        src="/img/edit-form-header.webp"
        fit="scale-down"
        alt="user edit header img"
      />
      <Form />
    </Container>
  )
}
