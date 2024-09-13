import { TextAreaForm } from '@/components/ReactFormSet'
import { Button, Flex, Modal, Text } from '@mantine/core'
import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form'

interface CreateTeamModalProps {
  opened: boolean
  onClose: () => void
  form: UseFormReturn<any>
  onSubmit: SubmitHandler<FieldValues>
}

export default function CreateTeamModal({
  opened,
  onClose,
  form,
  onSubmit,
}: CreateTeamModalProps) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await form.handleSubmit(onSubmit)(event)
  }

  return (
    <Modal.Root opened={opened} onClose={onClose} size="xl" centered>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            <Text fw={700} size="xl" ta="center">
              チーム開発をスタート
            </Text>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} role="form">
            <TextAreaForm
              form={form}
              name="offer"
              label="得られるもの"
              required
              mb="lg"
            />
            <TextAreaForm
              form={form}
              name="requirement"
              label="お願いすること"
              required
              mb="lg"
            />
            <Flex align="center" justify="center" gap="xl">
              <Button color="gray.6" onClick={onClose}>
                戻る
              </Button>
              <Button color="orange.6" type="submit">
                保存
              </Button>
            </Flex>
          </form>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  )
}
