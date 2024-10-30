import { useDestroyTeam } from '@/components/team/destroy/useDestroyTeam'
import { DestroyModal } from '@/components/team/DestroyModal'
import { Menu } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconDots, IconPencil, IconTrash } from '@tabler/icons-react'
import Link from 'next/link'

type TeamMenuProps = {
  teamID: string
}
export const TeamMenu = ({ teamID }: TeamMenuProps) => {
  const [opened, { open, close }] = useDisclosure(false)
  const { handleDestroyTeam } = useDestroyTeam(close)
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
      <DestroyModal
        opened={opened}
        onClose={close}
        action={handleDestroyTeam}
        confirmText="チームを削除します。よろしいですか？"
        actionName="チーム削除"
      />
    </Menu>
  )
}
