import { Avatar, Button, Group, Text } from '@mantine/core'
import { Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { SignInForm } from '@/components/SignIn/SignInForm'
import { modals } from '@mantine/modals'

export const UserIcon = () => {
  // const [opened, { open, close }] = useDisclosure(false)
  return (
    <>
      <Group position="center">
        {
          (() => {
            if (true) {
              return <>
                <Button onClick={() => {
                  modals.openConfirmModal({
                    title: 'ユーザーログイン',
                    centered: true,
                    confirmButton: null,
                    cancelButton: null,
                    children: (
                      <SignInForm />
                    ),
                  })
                }}>
                  <Avatar radius="xl" />
                </Button>
              </>
            } else {
              return <Text>false</Text>
            }
          })()
        }
      </Group>
      {/* <Modal opened={opened} onClose={close} title="ユーザーログイン">
        <SignInForm />
      </Modal> */}
    </>
  )
}
