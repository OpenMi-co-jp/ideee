import React from 'react'
import { useRouter } from 'next/router'
import { Group, Image, Loader, Text } from '@mantine/core'
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
    <Group py="lg" pl='xl'>
      <Image
        height={30}
        width={30}
        radius={30}
        src={data?.idea.user.icon}
        alt="user prof"
      />
      <Text size="xl">
        {data?.idea.user.name}
      </Text>
    </Group>
  )
}
