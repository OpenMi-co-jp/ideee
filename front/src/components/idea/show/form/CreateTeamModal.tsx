import { TextForm } from '@/components/ReactFormSet'
import { Button, Flex, Modal, Paper, Text } from '@mantine/core'
import { IconXboxX } from '@tabler/icons-react'
import {
  FieldValues,
  SubmitHandler,
  UseFormReturn,
  useFormState,
} from 'react-hook-form'

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
  const { errors } = useFormState({ control: form.control })

  return (
    <Modal.Root opened={opened} onClose={onClose} size="xl" centered>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            <Text fw={700} size="xl" ta="center">
              チーム開発を開始
            </Text>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Paper p="lg">input</Paper>
          <Flex align="center" justify="center" gap="6">
            <Button color="gray.6" onClick={onClose}>
              戻る
            </Button>
            <Button color="orange.6" onClick={onSubmit}>
              作成
            </Button>
          </Flex>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  )
}
