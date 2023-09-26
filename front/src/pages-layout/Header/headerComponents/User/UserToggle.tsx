import { Button, Group, Space, Box,rem } from '@mantine/core'
import { SignUpForm, SignInForm } from '@/components/Auth'
import { openModal } from '@mantine/modals'
import { useLoggedIn } from '@/components/loginContext'
import { UserMenu } from './UserMenu'
import Link from 'next/link'
import { useMediaQuery } from '@mantine/hooks'

export const UserToggle = () => {
  const { loggedIn } = useLoggedIn()
  const LSLoggedIn = localStorage.getItem('loggedIn') == 'true'
  const isMobile = useMediaQuery(`(max-width: ${rem(530)})`)

  return (
    <Group>
      {(() => {
        if (LSLoggedIn || loggedIn) {
          return <UserMenu />
        } else {
          return (
            <Box m="0.5rem"  style={{display: "flex", flexDirection:  isMobile ? 'column' : 'row'}}>
              <Link href="/user/sign_up">
                <Button w="8rem">ユーザー登録</Button>
              </Link>
              <Space m="2%" />
              <Link href="/user/sign_in">
                <Button w="8rem">ログイン</Button>
              </Link>
            </Box>
          )
        }
      })()}
    </Group>
  )
}
