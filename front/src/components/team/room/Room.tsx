import { CommentCreateForm } from '@/components/comment'
import { Comment } from '@/components/comment/Comment'
import { useCommentsInstance } from '@/components/comment/CommentList/useCommentsInstance'
import { CommentProvider } from '@/context/CommentContext'
import { Divider, Paper, Title } from '@mantine/core'
import React from 'react'

export const Room = () => {
  const { data } = useCommentsInstance()

  return (
    <>
      <Paper bg="#fef6eb" radius="md" p="xs" m="lg">
        <Title order={3} size="xl" p="sm" c="gray">
          トークルーム
        </Title>
        <Divider size="sm" my="xs" color="gray" />
        {/* {data?.comments.map((comment) => (
          <React.Fragment key={comment.id}>
            <CommentProvider comment={comment}>
              <Comment />
            </CommentProvider>
          </React.Fragment>
        ))} */}
      </Paper>
      {/* <CommentCreateForm /> */}
    </>
  )
}
