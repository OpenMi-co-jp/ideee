import { Card, Image } from '@mantine/core'
import { Form } from './UserEditForm'

export const UserEditForm = () => {
  return (
    <>
      <Image
        src="/img/edit-form-header.webp"
        fit="scale-down"
        alt="user edit header img"
      />
      <Form />
    </>
  )
}
