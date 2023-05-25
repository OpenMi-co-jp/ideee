import { Avatar, Button, Group, Title } from '@mantine/core'
import { SignOutButton } from '@/components/LogOut'
import { SignInForm } from '@/components/SignIn'
import { openModal } from '@mantine/modals'
import { useLoggedIn } from '@/components/loginContext'

export const UserIcon = () => {
  const { loggedIn } = useLoggedIn()
  return (
    <Group position="center">
      {(() => {
        if (!loggedIn) {
          return (
            <Button
              onClick={() => {
                return openModal({
                  title: <Title>ユーザーログイン</Title>,
                  children: <SignInForm />,
                })
              }}
            >
              <Avatar radius="xl" />
            </Button>
          )
        } else {
          return <SignOutButton />
        }
      })()}
    </Group>
  )
}
