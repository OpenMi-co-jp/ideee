import { Button, Group } from '@mantine/core'
import { useLoggedIn } from '@/components/loginContext'
import { UserMenu } from './UserMenu'
import Link from 'next/link'

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
              <Link href="@/user/sign_up">
                <Button>ユーザー登録</Button>
              </Link>
              <Link href="@/user/sign_in">
                <Button>ログイン</Button>
              </Link>
            </>
          )
        }
      })()}
    </Group>
  )
}
