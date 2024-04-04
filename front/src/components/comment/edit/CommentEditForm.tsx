import { Button, Group, Paper } from '@mantine/core'
import { TextAreaForm } from '@/components/ReactFormSet'
import { useCommentAction } from './edit'
import { IconSend } from '@tabler/icons-react'
import { useComment } from '@/context/CommentContext'

export const CommentEditForm = () => {
  const { form, onSubmit } = useCommentAction()
  const description = form.watch('description')
  const { comment, setIsEditing } = useComment()

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
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
          disabled={!description}
          leftSection={<IconSend />}
        >
          保存
        </Button>
      </Group>
    </form>
  )
}
