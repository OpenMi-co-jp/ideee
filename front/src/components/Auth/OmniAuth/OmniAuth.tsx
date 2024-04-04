import { Button, Stack } from '@mantine/core'
import { handleSignIn } from './hooks'
import { IconBrandX, IconBrandGoogleFilled } from '@tabler/icons-react'
import { useGetCsrfToken } from '@/utils/auth/useGetCsrfToken'
import { useCallback } from 'react'

export const OmniAuth = () => {
  const csrfToken = useGetCsrfToken()

  const onGoogleLogin = useCallback(() => {
    if (csrfToken) {
      handleSignIn({ provider: 'google_oauth2', authenticity_token: csrfToken })
    }
  }, [csrfToken])

  const onTwitterLogin = useCallback(() => {
    if (csrfToken) {
      handleSignIn({ provider: 'twitter', authenticity_token: csrfToken })
    }
  }, [csrfToken])

  return (
    <Stack my="xl" gap="lg">
      <Button
        leftSection={<IconBrandGoogleFilled />}
        onClick={onGoogleLogin}
        variant="gradient"
        gradient={{ from: '#4285f4', to: '#34a853', deg: 90 }}
      >
        Google ログイン
      </Button>
      <Button
        leftSection={<IconBrandX />}
        onClick={onTwitterLogin}
        style={{ backgroundColor: '#0f1419' }}
      >
        X ログイン
      </Button>
    </Stack>
  )
}
