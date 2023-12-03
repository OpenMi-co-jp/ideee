import { Menu, Box } from '@mantine/core'
import { IconSettings, IconLogout, IconUserCircle } from '@tabler/icons-react'
import { SignOutAnchor } from '@/components/Auth'
import Link from 'next/link'
import { UserIcon } from '@/components/user'
import { useCurrentUser } from '@/context/CurrentUserContext'

export const UserMenu = () => {
  const { currentUser } = useCurrentUser()

  return (
    <Menu shadow="md" width={200} offset={5}>
      <Menu.Target>
        <Box>
          <UserIcon userIcon={currentUser?.image} />
        </Box>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Link href={`/user/${currentUser?.id}/edit`}>
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
