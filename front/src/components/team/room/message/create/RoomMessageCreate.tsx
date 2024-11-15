import { Button, Center } from '@mantine/core'
import { IconSend } from '@tabler/icons-react'
import { useMessagesCreate } from '@/components/team/room/message/create'
import { useState } from 'react'
import { TextAreaForm } from '@/components/ReactFormSet'

export const RoomMessageCreate = () => {
  const { form, onSubmit } = useMessagesCreate()
  const content = form.watch('content')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    await form.handleSubmit(onSubmit)(event)
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} role="form">
      <TextAreaForm
        form={form}
        name="content"
        label="メッセージ"
        placeholder="メッセージを入力してください"
      />
      <Center mt="lg">
        <Button
          type="submit"
          variant="light"
          size="lg"
          color="orange"
          disabled={isSubmitting || !content}
          leftSection={<IconSend />}
        >
          保存
        </Button>
      </Center>
    </form>
  )
}
