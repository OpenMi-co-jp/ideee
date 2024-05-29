import { SpeechBubble } from '@/components/SpeechBubble/SpeechBubble'
import { useFetchCsrfToken } from '@/utils/auth/useFetchCsrfToken'
import { Button, Stack } from '@mantine/core'
import { IconBrandGoogleFilled, IconBrandX } from '@tabler/icons-react'
import { useCallback } from 'react'
import { handleSignIn } from './hooks'

type OmniAuthProps = {
  deviceProvider?: string
}

export const OmniAuth = ({ deviceProvider }: OmniAuthProps) => {
  const csrfToken = useFetchCsrfToken()

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
      {deviceProvider === 'google' && <SpeechBubble />}
      <Button
        leftSection={<IconBrandGoogleFilled />}
        onClick={onGoogleLogin}
        variant="gradient"
        gradient={{ from: '#4285f4', to: '#34a853', deg: 90 }}
      >
        Google ログイン
      </Button>
      {deviceProvider === 'twitter' && <SpeechBubble />}
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
