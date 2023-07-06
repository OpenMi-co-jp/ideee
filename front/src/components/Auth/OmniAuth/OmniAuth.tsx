import { Box, Button, Stack } from '@mantine/core'
import { handleSignIn } from './hooks'
import { useLoggedIn } from '@/components/loginContext'

export const OmniAuth = () => {
  const onSubmit = () => handleSignIn()

  return <Button onClick={onSubmit}>Google ログインpost</Button>
}
