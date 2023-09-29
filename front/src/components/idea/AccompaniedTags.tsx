import React from 'react'
import { useRouter } from 'next/router'
import { Loader } from '@mantine/core'
import { useGetIdeaQuery } from '@/lib/generated/client'

export const AccompaniedTags = () => {
  const router = useRouter()
  const { data, loading, error } = useGetIdeaQuery({
    variables: {
      id: router.query.id as string,
    },
  })

  if (loading) return <Loader color="yellow" />

  return (
    <>
      {data?.idea.ideaTags?.map((tag) => {
        return <div key={tag.id}>{tag.name}</div>
      })}
    </>
  )
}
