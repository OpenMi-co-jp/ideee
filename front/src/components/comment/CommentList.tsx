import React from 'react'
import { useRouter } from 'next/router'
import { Loader, Paper, Text, Divider } from '@mantine/core'
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
    <Paper bg="#FCD19C" radius="md" p="xs" m="lg">
      <Text size="xl" pt="md" pl="lg">
        Comment
      </Text>
      <Divider size="sm" my="xs" color="dark" />
      {data?.idea.comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </Paper>
  )
}
