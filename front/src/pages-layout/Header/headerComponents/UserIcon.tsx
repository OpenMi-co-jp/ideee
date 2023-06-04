import { Avatar, Button, Group, Title } from '@mantine/core'
import { SignInForm, SignOutButton } from '@/components/Auth'
import { openModal } from '@mantine/modals'
import { useLoggedIn } from '@/components/loginContext'

export const UserIcon = () => {
  const { loggedIn } = useLoggedIn()
  const LSLoggedIn = localStorage.getItem('loggedIn') == 'true'
  return (
    <Group position="center">
      {(() => {
        if (LSLoggedIn || loggedIn) {
          return <SignOutButton />
        } else {
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
        }
      })()}
    </Group>
  )
}
