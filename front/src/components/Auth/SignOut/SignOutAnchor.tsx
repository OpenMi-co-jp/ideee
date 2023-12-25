import { Anchor } from '@mantine/core'
import { HandleSignOut } from './hooks'
import { useCurrentUser } from '@/context/CurrentUserContext'

export const SignOutAnchor = () => {
  const { clearCurrentUser } = useCurrentUser()
  const onSubmit = () => HandleSignOut(clearCurrentUser)

  return (
    <Anchor c="yellow" onClick={onSubmit}>
      ログアウト
    </Anchor>
  )
}
