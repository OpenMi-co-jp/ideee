import { Menu, Box } from '@mantine/core'
import {
  IconSettings,
  IconLogout,
  IconUserCircle,
  IconUserEdit,
} from '@tabler/icons-react'
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
        <Link href={`/users/${currentUser?.id}`}>
          <Menu.Item leftSection={<IconUserCircle size={14} />}>
            マイページ
          </Menu.Item>
        </Link>
        <Link href={'/mypage/edit'}>
          <Menu.Item leftSection={<IconUserEdit size={14} />}>
            ユーザー情報編集
          </Menu.Item>
        </Link>
        <Link href="/settings">
          <Menu.Item leftSection={<IconSettings size={14} />}>
            通知設定
          </Menu.Item>
        </Link>
        <Menu.Divider />

        <Menu.Item color="red" leftSection={<IconLogout size={14} />}>
          <SignOutAnchor />
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
