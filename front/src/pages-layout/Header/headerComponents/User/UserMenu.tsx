import { Menu, Box } from '@mantine/core'
import { IconSettings, IconLogout, IconUserCircle } from '@tabler/icons-react'
import { SignOutAnchor } from '@/components/Auth'
import Link from 'next/link'
import { UserIcon } from '@/components/user'

export const UserMenu = () => {
  return (
    <Menu shadow="md" width={200} offset={5}>
      <Menu.Target>
        <Box>
          <UserIcon />
        </Box>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Link href="/user/5/edit">
          <Menu.Item leftSection={<IconUserCircle size={14} />}>
            ユーザー情報編集
          </Menu.Item>
        </Link>
        <Menu.Item leftSection={<IconSettings size={14} />}>Settings</Menu.Item>

        <Menu.Divider />

        <Menu.Item color="red" leftSection={<IconLogout size={14} />}>
          <SignOutAnchor />
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
