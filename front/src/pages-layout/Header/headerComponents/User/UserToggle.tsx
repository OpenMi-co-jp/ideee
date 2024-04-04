import { Button, Group, Space, Box } from '@mantine/core'
import { UserMenu } from './UserMenu'
import Link from 'next/link'
import { useBreakPoint } from '@/utils/hooks/useBreakPoint'
import { useCurrentUser } from '@/context/CurrentUserContext'
import {
  LOGIN_URL,
  LOGIN_TEXT,
  SIGNUP_URL,
  SIGNUP_TEXT,
} from '@/utils/constant'

export const UserToggle = () => {
  const { isMobile, isNarrowScreenMobile } = useBreakPoint()
  const { currentUser } = useCurrentUser()

  return (
    <Group>
      {currentUser && !isMobile && <UserMenu />}

      {(() => {
        if (!currentUser) {
          return (
            <Box
              style={{
                display: 'flex',
              }}
            >
              {!isNarrowScreenMobile && (
                <Link href={SIGNUP_URL}>
                  <Button
                    variant="gradient"
                    gradient={{ from: 'red', to: 'orange' }}
                  >
                    {SIGNUP_TEXT}
                  </Button>
                </Link>
              )}

              {!isMobile && (
                <>
                  <Space mx="xs" />
                  <Link href={LOGIN_URL}>
                    <Button variant="outline" color="orange">
                      {LOGIN_TEXT}
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
