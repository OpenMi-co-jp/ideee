import { Button, Center } from '@mantine/core'
import { TextAreaForm } from '@/components/ReactFormSet'
import { useCommentAction } from './hooks'
import { IconSend } from '@tabler/icons-react'

export const CommentForm = () => {
  const { form, onSubmit } = useCommentAction()
  const description = form.watch('description')

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <TextAreaForm form={form} name="description" label="コメント" />

      <Center mt="lg">
        <Button
          type="submit"
          variant="light"
          size="lg"
          color="orange"
          disabled={!description}
          leftSection={<IconSend />}
        >
          Send
        </Button>
      </Center>
    </form>
  )
}
