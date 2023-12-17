import { Button, Group, Space, Box } from '@mantine/core'
import { UserMenu } from './UserMenu'
import Link from 'next/link'
import { useMediaQuery } from '@mantine/hooks'
import { useCurrentUser } from '@/context/CurrentUserContext'

export const UserToggle = () => {
  const isMobile = useMediaQuery(`(max-width: 550px)`)
  const isMobile2 = useMediaQuery(`(max-width: 334px)`)
  const { currentUser } = useCurrentUser()

  return (
    <Group>
      {(() => {
        if (currentUser) {
          return <UserMenu />
        } else {
          return (
            <Box
              style={{
                display: 'flex',
              }}
            >
              {!isMobile2 && (
                <Link href="/users/sign_up">
                  <Button
                    variant="gradient"
                    gradient={{ from: 'red', to: 'orange' }}
                  >
                    ユーザー登録
                  </Button>
                </Link>
              )}

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
