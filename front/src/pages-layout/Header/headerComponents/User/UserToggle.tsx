import { Button, Group, Space, Box, rem } from '@mantine/core'
import { useLoggedIn } from '@/components/loginContext'
import { UserMenu } from './UserMenu'
import Link from 'next/link'
import { useMediaQuery } from '@mantine/hooks'

export const UserToggle = () => {
  const { loggedIn } = useLoggedIn()
  const LSLoggedIn = localStorage.getItem('loggedIn') == 'true'
  const isMobile = useMediaQuery(`(max-width: ${rem(550)})`)

  return (
    <Group>
      {(() => {
        if (LSLoggedIn || loggedIn) {
          return <UserMenu />
        } else {
          return (
            <Box
              mx="0.5rem"
              style={{
                display: 'flex'
              }}
            >
              <Link href="/user/sign_up">
                <Button variant="gradient" gradient={{ from: 'red', to: 'orange' }}>
                  ユーザー登録
                </Button>
              </Link>
              <Space m="2%" />
              <Link href="/user/sign_in" style={{ display: isMobile ? 'none' : '' }}>
                <Button variant="outline" color='orange'>ログイン</Button>
              </Link>
            </Box>
          )
        }
      })()}
    </Group>
  )
}
