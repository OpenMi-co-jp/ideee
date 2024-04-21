import { IconDots, IconPencil, IconTrash } from '@tabler/icons-react'
import { Menu } from '@mantine/core'
import Link from 'next/link'
import { useDestroyIdea } from '@/components/idea/useDestroyIdea'
import { useIdea } from '@/context/IdeaContext'
import { EDIT_TEXT, DELETE_TEXT } from '@/utils/constant'

interface IdeaMenuProps {
  ideaId: string
}

export const IdeaMenu: React.FC<IdeaMenuProps> = ({ ideaId }) => {
  const { handleDestroyIdea } = useDestroyIdea()
  const idea = useIdea()

  return (
    <Menu shadow="md" width={200} offset={5}>
      <Menu.Target>
        <IconDots />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>アイデア管理</Menu.Label>
        <Link href={`/ideas/${ideaId}/edit`}>
          <Menu.Item leftSection={<IconPencil size={14} />}>
            {EDIT_TEXT}
          </Menu.Item>
        </Link>

        <Menu.Divider />

        <Menu.Item
          onClick={() => {
            window.confirm('本当に削除してもよろしいですか？') &&
              handleDestroyIdea(ideaId)
          }}
          color="red"
          leftSection={<IconTrash size={14} />}
        >
          {DELETE_TEXT}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
