import { Button, Anchor, Group, Title } from '@mantine/core'
import { SignInForm } from '@/components/Auth'
import { openModal } from '@mantine/modals'
import { useLoggedIn } from '@/components/loginContext'
import { UserMenu } from './UserMenu'

export const UserToggle = () => {
  const { loggedIn } = useLoggedIn()
  const LSLoggedIn = localStorage.getItem('loggedIn') == 'true'
  return (
    <Group position="center">
      {(() => {
        if (LSLoggedIn || loggedIn) {
          return <UserMenu />
        } else {
          return (
            <>
              <Button
                onClick={() => {
                  return openModal({
                    title: <Title>ユーザーログイン</Title>,
                    children: <SignInForm />,
                  })
                }}
              >
                サインイン
              </Button>
              <Anchor
                onClick={() => {
                  return openModal({
                    title: <Title>ユーザーログイン</Title>,
                    children: <SignInForm />,
                  })
                }}
              >
                ログイン
              </Anchor>
            </>
          )
        }
      })()}
    </Group>
  )
}
