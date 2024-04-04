import { Paper, Title, Divider } from '@mantine/core'
import { Comment } from '../Comment'
import { CommentProvider } from '@/context/CommentContext'
import React from 'react'
import { useCommentsInstance } from './useCommentsInstance'

export const CommentList = () => {
  const { data } = useCommentsInstance()

  return (
    <Paper bg="#fef6eb" radius="md" p="xs" m="lg">
      <Title order={3} size="xl" p="sm" c="gray">
        コメント
      </Title>
      <Divider size="sm" my="xs" color="gray" />
      {data?.comments.map((comment) => (
        <React.Fragment key={comment.id}>
          <CommentProvider comment={comment}>
            <Comment />
          </CommentProvider>
        </React.Fragment>
      ))}
    </Paper>
  )
}
