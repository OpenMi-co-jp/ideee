import { Button, Stack } from '@mantine/core'
import { handleSignIn } from './hooks'
import { IconBrandX, IconBrandGoogleFilled } from '@tabler/icons-react'

export const OmniAuth = () => {
  const onGoogleLogin = () => handleSignIn({ provider: 'google_oauth2' })
  const onTwitterLogin = () => handleSignIn({ provider: 'twitter' })

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
        Twitter ログイン
      </Button>
    </Stack>
  )
}
