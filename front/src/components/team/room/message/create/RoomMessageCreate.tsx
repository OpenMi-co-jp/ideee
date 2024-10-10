import { Button, Center } from '@mantine/core'
import { IconSend } from '@tabler/icons-react'

export const RoomMessageCreate = () => {
  // const { form, onSubmit } = useMessageAction()
  // const content = form.watch('content')
  // const [isSubmitting, setIsSubmitting] = useState(false)

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   setIsSubmitting(true)
  //   await form.handleSubmit(onSubmit)(event)
  //   setIsSubmitting(false)
  // }

  return (
    <form>
      {/* <TextAreaForm form={form} name=content" label="メッセージ" /> */}

      <Center mt="lg">
        <Button
          type="submit"
          variant="light"
          size="lg"
          color="orange"
          // disabled={isSubmitting || !roomMessage}
          leftSection={<IconSend />}
        >
          保存
        </Button>
      </Center>
    </form>
  )
}
