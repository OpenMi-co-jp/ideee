import { Button, Group, Paper } from '@mantine/core'
import { TextAreaForm } from '@/components/ReactFormSet'
import { useCommentAction } from './edit'
import { IconSend } from '@tabler/icons-react'
import { useComment } from '@/context/CommentContext'
import { useState } from 'react'

export const CommentEditForm = () => {
  const { form, onSubmit } = useCommentAction()
  const description = form.watch('description')
  const { setIsEditing } = useComment()
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
        maw="30rem"
        mt="3px"
        style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}
      >
        <TextAreaForm form={form} name="description" />
      </Paper>

      <Group justify="flex-end" gap="sm" mt="md">
        <Button
          variant="light"
          color="gray"
          size="xs"
          onClick={() => setIsEditing(false)}
        >
          キャンセル
        </Button>
        <Button
          type="submit"
          variant="light"
          size="xs"
          color="orange"
          disabled={isSubmitting || !description}
          leftSection={<IconSend />}
        >
          保存
        </Button>
      </Group>
    </form>
  )
}
