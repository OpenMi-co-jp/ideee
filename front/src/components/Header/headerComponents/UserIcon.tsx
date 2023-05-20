import { Avatar, Button, Group } from '@mantine/core'
import { Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { SignInForm } from '@/components/SignIn/SignInForm'

export const UserIcon = () => {
  const [opened, { open, close }] = useDisclosure(false)
  return (
    <>
      <Group position="center">
        <Button onClick={open}>
          <Avatar radius="xl" />
        </Button>
      </Group>
      <Modal opened={opened} onClose={close} title="ユーザーログイン">
        <SignInForm />
      </Modal>
    </>
  )
}
