import React from 'react'
import { useRouter } from 'next/router'
import { Loader } from '@mantine/core'
import { useGetIdeaQuery } from '@/lib/generated/client'
import { Comment } from '@/components/idea'

export const CommentList = () => {
  const router = useRouter()
  const { data, loading, error } = useGetIdeaQuery({
    variables: {
      id: router.query.id as string,
    },
  })

  if (loading) return <Loader color="yellow" />

  return (
    <>
      {data?.idea.comments.map((comment) =>
        <Comment key={comment.id} comment={comment} />
      )}
    </>
  )
}

