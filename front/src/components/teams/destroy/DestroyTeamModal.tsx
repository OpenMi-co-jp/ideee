import { Button, Flex, Modal, Text } from '@mantine/core'
import { useDestroyTeam } from '@/components/teams/destroy/useDestroyTeam'

interface DestroyTeamModalProps {
  opened: boolean
  onClose: () => void
}
export const DestroyTeamModal = ({
  opened,
  onClose,
}: DestroyTeamModalProps) => {
  const { handleDestroyTeam } = useDestroyTeam(onClose)
  return (
    <Modal.Root opened={opened} onClose={onClose} size="md" centered>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            <Text size="xl" fw="600">
              チーム削除
            </Text>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Text>チームを削除します。よろしいですか？</Text>
        </Modal.Body>
        <Flex align="center" justify="center" m="sm" gap="md">
          <Button radius="lg" bg="orange.6" onClick={onClose}>
            戻る
          </Button>
          <Button
            radius="lg"
            bg="gray.6"
            onClick={() => {
              handleDestroyTeam()
              onClose()
            }}
          >
            削除
          </Button>
        </Flex>
      </Modal.Content>
    </Modal.Root>
  )
}
