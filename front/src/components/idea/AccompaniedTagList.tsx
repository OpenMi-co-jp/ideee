import React from 'react'
import { useRouter } from 'next/router'
import { Group, Loader } from '@mantine/core'
import { useGetIdeaQuery } from '@/lib/generated/client'
import { AccompaniedTag } from '@/components/idea'

export const AccompaniedTagList = () => {
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
        return <AccompaniedTag key={tag.id} tag={tag} />
      })}
    </Group>
  )
}
