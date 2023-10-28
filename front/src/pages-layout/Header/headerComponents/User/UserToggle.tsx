import { Button, Group, Space, Box } from '@mantine/core'
import { useLoggedIn } from '@/components/loginContext'
import { UserMenu } from './UserMenu'
import Link from 'next/link'
import { useMediaQuery } from '@mantine/hooks'

export const UserToggle = () => {
  const { loggedIn } = useLoggedIn()
  const LSLoggedIn = localStorage.getItem('loggedIn') == 'true'
  const isMobile = useMediaQuery(`(max-width: 550px)`)

  return (
    <Group>
      {(() => {
        if (LSLoggedIn || loggedIn) {
          return <UserMenu />
        } else {
          return (
            <Box
              style={{
                display: 'flex',
              }}
            >
              <Link href="/users/sign_up">
                <Button
                  variant="gradient"
                  gradient={{ from: 'red', to: 'orange' }}
                >
                  ユーザー登録
                </Button>
              </Link>
              {!isMobile && (
                <>
                  <Space mx="xs" />
                  <Link href="/users/sign_in">
                    <Button variant="outline" color="orange">
                      ログイン
                    </Button>
                  </Link>
                </>
              )}
            </Box>
          )
        }
      })()}
    </Group>
  )
}
