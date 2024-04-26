import { Anchor } from '@mantine/core'
import { useSignOut } from './hooks'

export const SignOutAnchor = () => {
  const handleSignOut = useSignOut()

  return (
    <Anchor c="yellow" onClick={handleSignOut}>
      ログアウト
    </Anchor>
  )
}
