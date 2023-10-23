import { Anchor } from '@mantine/core'
import { handleSignOut } from './hooks'
import { useLoggedIn } from '@/components/loginContext'

export const SignOutAnchor = () => {
  const { setLoggedIn } = useLoggedIn()
  const onSubmit = () => handleSignOut(setLoggedIn)

  return (
    <Anchor c="yellow" onClick={onSubmit}>
      ログアウト
    </Anchor>
  )
}
