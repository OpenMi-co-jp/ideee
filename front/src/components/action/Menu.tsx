import { IconDots, IconPencil, IconTrash } from '@tabler/icons-react'
import { Menu } from '@mantine/core'

interface ActionMenuProps {
  title: string
  onEdit: () => void
  onDelete: () => void
}

export const ActionMenu = ({ onEdit, onDelete, title }: ActionMenuProps) => {
  return (
    <Menu shadow="md" width={200} offset={5}>
      <Menu.Target>
        <IconDots />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>{title}</Menu.Label>
        <Menu.Item onClick={onEdit} leftSection={<IconPencil size={14} />}>
          Edit
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          onClick={() => {
            window.confirm('本当に削除してもよろしいですか？') && onDelete()
          }}
          color="red"
          leftSection={<IconTrash size={14} />}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
