import React from 'react'
import { useRouter } from 'next/router'
import { Group, Loader, Text } from '@mantine/core'
import { useGetIdeaQuery } from '@/lib/generated/client'

export const IdeaTagList = () => {
  const router = useRouter()
  const { data, loading, error } = useGetIdeaQuery({
    variables: {
      id: router.query.id as string,
    },
  })

  if (loading) return <Loader color="yellow" />

  return (
    <Group pb="lg" pl="xl">
      {data?.idea.ideaTags?.map((tag) => {
        return (
          <Text size="lg" c="#EAAE59" key={tag.id}>
            #{tag.name}
          </Text>
        )
      })}
    </Group>
  )
}
