import { Button, Group, Space, Box } from '@mantine/core'
import { UserMenu } from './UserMenu'
import Link from 'next/link'
import { useScreenQuery } from '@/utils/hooks/useScreenQuery'
import { useCurrentUser } from '@/context/CurrentUserContext'

export const UserToggle = () => {
  const { isMobile, isNarrowScreenMobile } = useScreenQuery()
  const { currentUser } = useCurrentUser()

  return (
    <Group>
      {currentUser && isMobile && <UserMenu />}

      {(() => {
        if (!currentUser) {
          return (
            <Box
              style={{
                display: 'flex',
              }}
            >
              {isNarrowScreenMobile && (
                <Link href="/users/sign_up">
                  <Button
                    variant="gradient"
                    gradient={{ from: 'red', to: 'orange' }}
                  >
                    ユーザー登録
                  </Button>
                </Link>
              )}

              {isMobile && (
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
