import React from 'react'
import { useRouter } from 'next/router'
import { Image, Title, Group, Button, Loader } from '@mantine/core'
import { useGetIdeaQuery } from '@/lib/generated/client'

export const IdeaTitle = () => {
  const router = useRouter()
  const { data, loading, error } = useGetIdeaQuery({
    variables: {
      id: router.query.id as string,
    },
  })

  if (loading) return <Loader color="yellow" />

  return (
    <Group py="xl" position="center">
      <Image
        height={50}
        width={50}
        radius={50}
        src={data?.idea.icon}
        alt="user prof"
      />
      <Title>{data?.idea.name}</Title>
    </Group>
  )
}
