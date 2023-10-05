import { useRouter } from 'next/router'
import { Loader, Paper, Title, Divider } from '@mantine/core'
import { useGetIdeaQuery } from '@/lib/generated/client'
import { Comment } from './Comment'

export const CommentList = () => {
  const router = useRouter()
  const { data, loading, error } = useGetIdeaQuery({
    variables: {
      id: router.query.id as string,
    },
  })

  if (loading) return <Loader color="yellow" />

  return (
    <Paper bg="#fef6eb" radius="md" p="xs" m="lg">
      <Title order={3} size="xl" p="sm">
        Comment
      </Title>
      <Divider size="sm" my="xs" color="gray" />
      {data?.idea.comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </Paper>
  )
}
