import { Flex, Menu } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconDots, IconPencil, IconTrash } from '@tabler/icons-react'
import { DestroyModal } from '@/components/team/DestroyModal'
import { useDestroyMessage } from './destroy'

type RoomActionProps = {
  messageId: string
  startEditing: () => void
}

export const RoomAction = ({ messageId, startEditing }: RoomActionProps) => {
  const [opened, { open, close }] = useDisclosure(false)
  const { handleDestroyMessage } = useDestroyMessage(close, messageId)

  return (
    <Flex justify="end">
      <Menu shadow="md" width={200} offset={5}>
        <Menu.Target>
          <IconDots style={{ margin: '10px' }} />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>メッセージ管理</Menu.Label>
          <Menu.Item
            leftSection={<IconPencil size={14} />}
            onClick={startEditing}
          >
            メッセージ編集
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            onClick={open}
            color="red"
            leftSection={<IconTrash size={14} />}
          >
            メッセージ削除
          </Menu.Item>
        </Menu.Dropdown>
        <DestroyModal
          opened={opened}
          onClose={close}
          action={handleDestroyMessage}
          confirmText="メッセージを削除します"
          actionName="メッセージ削除"
        />
      </Menu>
    </Flex>
  )
}
