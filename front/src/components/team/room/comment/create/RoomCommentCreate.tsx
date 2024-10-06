import { TextAreaForm } from '@/components/ReactFormSet'
import { Button, Center } from '@mantine/core'
import { IconSend } from '@tabler/icons-react'

export const RoomCommentCreate = () => {
  // const { form, onSubmit } = useCommentAction()
  // const description = form.watch('description')
  // const [isSubmitting, setIsSubmitting] = useState(false)

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   setIsSubmitting(true)
  //   await form.handleSubmit(onSubmit)(event)
  //   setIsSubmitting(false)
  // }

  return (
    <form>
      {/* <TextAreaForm form={form} name="description" label="コメント" /> */}

      <Center mt="lg">
        <Button
          type="submit"
          variant="light"
          size="lg"
          color="orange"
          // disabled={isSubmitting || !description}
          leftSection={<IconSend />}
        >
          保存
        </Button>
      </Center>
    </form>
  )
}
