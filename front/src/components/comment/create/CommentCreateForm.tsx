import { Button, Center } from '@mantine/core'
import { TextAreaForm } from '@/components/ReactFormSet'
import { useCommentAction } from './create'
import { IconSend } from '@tabler/icons-react'
import { useState } from 'react'

export const CommentCreateForm = () => {
  const { form, onSubmit } = useCommentAction()
  const description = form.watch('description')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    await form.handleSubmit(onSubmit)(event)
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextAreaForm form={form} name="description" label="コメント" />

      <Center mt="lg">
        <Button
          type="submit"
          variant="light"
          size="lg"
          color="orange"
          disabled={isSubmitting || !description}
          leftSection={<IconSend />}
        >
          保存
        </Button>
      </Center>
    </form>
  )
}
