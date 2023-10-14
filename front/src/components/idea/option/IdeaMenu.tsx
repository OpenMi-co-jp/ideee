import { IconDots, IconPencil, IconTrash } from '@tabler/icons-react'
import { Menu } from '@mantine/core'
import Link from 'next/link'

export const IdeaMenu = () => {
  return (
    <Menu shadow="md" width={200} offset={5}>
      <Menu.Target>
        <IconDots />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>アイデア管理</Menu.Label>
        <Link href="/idea/5/edit">
          <Menu.Item icon={<IconPencil size={14} />}>Edit</Menu.Item>
        </Link>

        <Menu.Divider />

        <Menu.Item color="red" icon={<IconTrash size={14} />}>
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
