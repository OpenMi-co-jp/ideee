import { Anchor } from '@mantine/core'
import { HandleSignOut } from './hooks'
import { useCurrentUser } from '@/context/CurrentUserContext'

export const SignOutAnchor = () => {
  const { logOut } = useCurrentUser()
  const onSubmit = () => HandleSignOut(logOut)

  return (
    <Anchor c="yellow" onClick={onSubmit}>
      ログアウト
    </Anchor>
  )
}
