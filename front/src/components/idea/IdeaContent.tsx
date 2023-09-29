import React from 'react'
import { useRouter } from 'next/router'
import { Loader } from '@mantine/core'
import { useGetIdeaQuery } from '@/lib/generated/client'
export const IdeaContent = () => {
  const router = useRouter()
  const { data, loading, error } = useGetIdeaQuery({
    variables: {
      id: router.query.id as string,
    },
  })

  if (loading) return <Loader color="yellow" />

  return (
    <>
      <div>{data?.idea.background}</div>
      <div>{data?.idea.goal}</div>
      <div>{data?.idea.issue}</div>
      <div>{data?.idea.wishFunction}</div>
      <div>{data?.idea.hypothesis}</div>
      <div>{data?.idea.target}</div>
      <div>{data?.idea.monetize}</div>
      <div>{data?.idea.similar}</div>
      <div>{data?.idea.note}</div>
    </>
  )
}
