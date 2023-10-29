import { Paper, Title, Divider, Group, Button, Center } from '@mantine/core'
import { Comment } from './Comment'
import { useIdea } from '@/context/IdeaContext'
import { IconSend } from '@tabler/icons-react'

export const CommentList = () => {
  const idea = useIdea()

  return (
    <>
      <Paper bg="#fef6eb" radius="md" p="xs" m="lg">
        <Title order={3} size="xl" p="sm" c="gray">
          Comment
        </Title>
        <Divider size="sm" my="xs" color="gray" />
        {idea.comments?.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </Paper>
      <Center>
        <Button
          type="submit"
          variant="light"
          size="lg"
          color="orange"
          disabled={true}
          leftSection={<IconSend />}
        >
          Send
        </Button>
      </Center>
    </>
  )
}
