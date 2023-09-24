import { Button, Anchor, Group, Title } from '@mantine/core'
import { SignUpForm, SignInForm } from '@/components/Auth'
import { openModal } from '@mantine/modals'
import { useLoggedIn } from '@/components/loginContext'
import { UserMenu } from './UserMenu'
import Link from 'next/link'

export const UserToggle = () => {
  const { loggedIn } = useLoggedIn()
  const LSLoggedIn = localStorage.getItem('loggedIn') == 'true'
  return (
    <Group>
      {(() => {
        if (LSLoggedIn || loggedIn) {
          return <UserMenu />
        } else {
          return (
            <Group mt="-0.5rem" mr="-1rem">
              <Link href="/user/sign_up">
                <Button mr="-0.3rem">ユーザー登録</Button>
              </Link>
              <Link href="/user/sign_in">
                <Button>ログイン</Button>
              </Link>
            </Group>
          )
        }
      })()}
    </Group>
  )
}
