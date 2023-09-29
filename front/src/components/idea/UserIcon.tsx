import React from 'react'
import { useRouter } from 'next/router'
import { Loader } from '@mantine/core'
import { useGetIdeaQuery } from '@/lib/generated/client'

export const UserIcon = () => {
  const router = useRouter()
  const { data, loading, error } = useGetIdeaQuery({
    variables: {
      id: router.query.id as string,
    },
  })

  if (loading) return <Loader color="yellow" />

  return (
    <>
      <div>{data?.idea.user.icon}</div>
      <div>{data?.idea.user.name}</div>
    </>
  )
}
