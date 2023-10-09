import { Paper, Title, Divider } from '@mantine/core'
import { Comment } from './Comment'
import { useIdea } from '@/context/IdeaContext'

export const CommentList = () => {
  const idea = useIdea()

  return (
    <Paper bg="#fef6eb" radius="md" p="xs" m="lg">
      <Title order={3} size="xl" p="sm">
        Comment
      </Title>
      <Divider size="sm" my="xs" color="gray" />
      {idea.comments?.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </Paper>
  )
}
