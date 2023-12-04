import { Anchor } from '@mantine/core'
import { HandleSignOut } from './hooks'
import { useCurrentUser } from '@/context/CurrentUserContext'

export const SignOutAnchor = () => {
  const { setCurrentUser } = useCurrentUser()
  const onSubmit = () => HandleSignOut(setCurrentUser)

  return (
    <Anchor c="yellow" onClick={onSubmit}>
      ログアウト
    </Anchor>
  )
}
