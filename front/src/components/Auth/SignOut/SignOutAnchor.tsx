import { Menu } from '@mantine/core'
import { useSignOut } from './hooks'
import { IconLogout } from '@tabler/icons-react'

export const SignOutAnchor = () => {
  const handleSignOut = useSignOut()

  return (
    <Menu.Item
      color="red"
      leftSection={<IconLogout size={14} />}
      onClick={handleSignOut}
    >
      ログアウト
    </Menu.Item>
  )
}
