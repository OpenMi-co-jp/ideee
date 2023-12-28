import { IconDots, IconPencil, IconTrash } from '@tabler/icons-react'
import { Menu } from '@mantine/core'
import Link from 'next/link'
import { useDestroyIdea } from '@/components/idea/useDestroyIdea'

export const IdeaMenu = () => {
  const { handleDestroyIdea } = useDestroyIdea()

  return (
    <Menu shadow="md" width={200} offset={5}>
      <Menu.Target>
        <IconDots />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>アイデア管理</Menu.Label>
        <Link href="/idea/5/edit">
          <Menu.Item leftSection={<IconPencil size={14} />}>Edit</Menu.Item>
        </Link>

        <Menu.Divider />

        <Menu.Item
          onClick={handleDestroyIdea}
          color="red"
          leftSection={<IconTrash size={14} />}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
