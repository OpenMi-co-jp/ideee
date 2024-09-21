import { Menu } from '@mantine/core'
import { IconDots, IconPencil, IconTrash } from '@tabler/icons-react'
import Link from 'next/link'
import { DestroyTeamModal } from '@/components/teams/destroy/DestroyTeamModal'
import { useDisclosure } from '@mantine/hooks'

type TeamMenuProps = {
  teamID: string
}
export const TeamMenu = ({ teamID }: TeamMenuProps) => {
  const [opened, { open, close }] = useDisclosure(false)
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
      <DestroyTeamModal opened={opened} onClose={close} />
    </Menu>
  )
}
