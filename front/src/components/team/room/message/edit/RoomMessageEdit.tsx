import { TextAreaForm } from '@/components/ReactFormSet'
import { Paper, Group, Button } from '@mantine/core'
import { IconSend } from '@tabler/icons-react'
import { useState } from 'react'
import { useMessageEdit } from '.'

type RoomMessageEditProps = {
  cancelEditing: () => void
  content: string
  messageId: string
}

export const RoomMessageEdit = ({
  cancelEditing,
  content,
  messageId,
}: RoomMessageEditProps) => {
  const { form, onSubmit } = useMessageEdit(content, messageId, cancelEditing)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    await form.handleSubmit(onSubmit)(event)
    setIsSubmitting(false)
  }
  return (
    <form onSubmit={handleSubmit}>
      <Paper
        w="15rem"
        maw="30rem"
        p="xs"
        mt="4px"
        radius="lg"
        style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}
      >
        <TextAreaForm
          form={form}
          name="content"
          label="メッセージ"
          placeholder="メッセージを入力してください"
        />
      </Paper>

      <Group justify="flex-end" gap="sm" mt="md">
        <Button variant="light" color="gray" size="xs" onClick={cancelEditing}>
          キャンセル
        </Button>
        <Button
          type="submit"
          variant="light"
          size="xs"
          color="orange"
          disabled={isSubmitting || !content}
          leftSection={<IconSend />}
        >
          保存
        </Button>
      </Group>
    </form>
  )
}
