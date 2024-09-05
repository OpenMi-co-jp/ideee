import { TextForm } from '@/components/ReactFormSet'
import { Button, Flex, Modal, Text } from '@mantine/core'
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
  // const [isSubmitting, setIsSubmitting] = useState(false)
  const { errors } = useFormState({ control: form.control })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // setIsSubmitting(true)
    await form.handleSubmit(onSubmit)(event)
    // setIsSubmitting(false)
  }

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
          <form onSubmit={handleSubmit} role="form">
            <TextForm
              form={form}
              name="offer"
              label="得られるもの"
              required
              mb="lg"
            />
            <TextForm
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
                作成
              </Button>
            </Flex>
          </form>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  )
}
