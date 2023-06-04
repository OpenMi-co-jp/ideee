import { Avatar, Button, Menu, Title } from '@mantine/core'
import { IconSettings, IconLogout } from '@tabler/icons-react'
import { SignOutAnchor } from '@/components/Auth'

export const UserMenu = () => {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Avatar radius="xl" />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>

        <Menu.Divider />

        <Menu.Item color="red" icon={<IconLogout size={14} />}><SignOutAnchor /></Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
