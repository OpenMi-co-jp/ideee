import { Paper, Title, Divider } from '@mantine/core'
import { Comment } from '../Comment'

import { useCommentsInstance } from './useCommentsInstance'

export const CommentList = () => {
  const { data } = useCommentsInstance()

  return (
    <Paper bg="#fef6eb" radius="md" p="xs" m="lg">
      <Title order={3} size="xl" p="sm" c="gray">
        Comment
      </Title>
      <Divider size="sm" my="xs" color="gray" />
      {data?.comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </Paper>
  )
}
