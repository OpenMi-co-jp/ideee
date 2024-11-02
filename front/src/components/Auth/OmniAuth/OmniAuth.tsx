import { useFetchCsrfToken } from '@/utils/auth/useFetchCsrfToken'
import { Button, Stack } from '@mantine/core'
import { IconBrandGoogleFilled, IconBrandX } from '@tabler/icons-react'
import { useCallback } from 'react'
import { handleSignIn } from './hooks'
import { LastLoginSuggest } from '@/components/LastLoginSuggest'

type OmniAuthProps = {
  deviceProvider?: string
  termsAccepted?: boolean
}

export const OmniAuth = ({
  deviceProvider,
  termsAccepted = true,
}: OmniAuthProps) => {
  const csrfToken = useFetchCsrfToken()

  const onGoogleLogin = useCallback(() => {
    if (csrfToken && termsAccepted) {
      handleSignIn({ provider: 'google_oauth2', authenticity_token: csrfToken })
    }
  }, [csrfToken, termsAccepted])

  const onTwitterLogin = useCallback(() => {
    if (csrfToken && termsAccepted) {
      handleSignIn({ provider: 'twitter', authenticity_token: csrfToken })
    }
  }, [csrfToken, termsAccepted])

  return (
    <Stack my="xl" gap="lg">
      {deviceProvider === 'google' && (
        <LastLoginSuggest lastLoginProvider={deviceProvider} />
      )}
      <Button
        leftSection={<IconBrandGoogleFilled />}
        onClick={onGoogleLogin}
        variant="gradient"
        gradient={{ from: '#4285f4', to: '#34a853', deg: 90 }}
        disabled={!termsAccepted}
      >
        Google ログイン
      </Button>
      {deviceProvider === 'twitter' && (
        <LastLoginSuggest lastLoginProvider={deviceProvider} />
      )}
      <Button
        leftSection={<IconBrandX />}
        onClick={onTwitterLogin}
        style={{ backgroundColor: '#0f1419' }}
        disabled={!termsAccepted}
      >
        X ログイン
      </Button>
    </Stack>
  )
}
