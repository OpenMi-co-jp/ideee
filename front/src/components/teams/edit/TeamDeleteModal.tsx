import { Button, Flex, Modal, Text } from '@mantine/core'
import { useDestroyTeam } from './useDestroyTeam'

interface CreateTeamModalProps {
  opened: boolean
  onClose: () => void
}
const TeamDeleteModal = ({ opened, onClose }: CreateTeamModalProps) => {
  const { handleDestroyTeam } = useDestroyTeam()
  return (
    <Modal.Root opened={opened} onClose={onClose} size="md" centered>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            <Text size="xl" fw="600">
              チーム開発を削除
            </Text>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <p>チーム開発を削除を実行します。よろしいですか？</p>
        </Modal.Body>
        <Flex align="center" justify="center" m="sm" gap="md">
          <Button radius="lg" bg="gray.6" onClick={onClose}>
            戻る
          </Button>
          <Button radius="lg" bg="orange.6" onClick={handleDestroyTeam}>
            削除
          </Button>
        </Flex>
      </Modal.Content>
    </Modal.Root>
  )
}

export default TeamDeleteModal
