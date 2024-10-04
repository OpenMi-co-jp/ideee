import { Button, Flex, Modal, Text } from '@mantine/core'

interface TeamModalProps {
  opened: boolean
  onClose: () => void
  action: () => void
  confirmText: string
  actionName: string
}
export const TeamModal = ({
  opened,
  onClose,
  action,
  confirmText,
  actionName,
}: TeamModalProps) => {
  return (
    <Modal.Root opened={opened} onClose={onClose} size="md" centered>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            <Text size="xl" fw="600">
              {`チーム${actionName}`}
            </Text>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Text>{confirmText}</Text>
        </Modal.Body>
        <Flex align="center" justify="center" m="sm" gap="md">
          <Button radius="lg" bg="orange.6" onClick={onClose}>
            戻る
          </Button>
          <Button
            radius="lg"
            bg="gray.6"
            onClick={() => {
              action()
            }}
          >
            {actionName}
          </Button>
        </Flex>
      </Modal.Content>
    </Modal.Root>
  )
}
