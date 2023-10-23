import { Button } from '@mantine/core'
import { handleSignIn } from './hooks'

export const OmniAuth = () => {
  const onGoogleLogin = () => handleSignIn({ provider: 'google_oauth2' })
  const onTwitterLogin = () => handleSignIn({ provider: 'twitter' })

  return (
    <>
      <Button onClick={onGoogleLogin}>Google ログインpost</Button>
      <Button onClick={onTwitterLogin}>Twitter ログインpost</Button>
    </>
  )
}
