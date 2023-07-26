import { Button, Anchor, Group, Title } from '@mantine/core'
import { SignUpForm, SignInForm } from '@/components/Auth'
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
                    title: <Title>ユーザー作成</Title>,
                    children: <SignUpForm />,
                  })
                }}
              >
                ユーザー作成
              </Button>
              <Button component="a" href="/user/sign_in">
                ログイン
              </Button>
            </>
          )
        }
      })()}
    </Group>
  )
}
