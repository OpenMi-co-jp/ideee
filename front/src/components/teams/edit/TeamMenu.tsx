import { useCurrentUser } from '@/context/CurrentUserContext'
import { Menu } from '@mantine/core'
import { IconDots, IconPencil, IconTrash } from '@tabler/icons-react'
import Link from 'next/link'

type TeamMenuProps = {
  teamID: string
  open: () => void
}
export const TeamMenu = ({ teamID, open }: TeamMenuProps) => {
  return (
    <Menu shadow="md" width={200} offset={5}>
      <Menu.Target>
        <IconDots style={{ margin: '10px' }} />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>チーム管理</Menu.Label>
        <Link href={`/teams/${teamID}/edit`}>
          <Menu.Item leftSection={<IconPencil size={14} />}>
            チーム編集
          </Menu.Item>
        </Link>
        <Menu.Divider />
        <Menu.Item
          onClick={open}
          color="red"
          leftSection={<IconTrash size={14} />}
        >
          チーム削除
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
