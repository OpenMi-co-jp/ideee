import React from 'react'
import { useRouter } from 'next/router'
import { Image, Title, Flex, Loader } from '@mantine/core'
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
    <Flex
      gap="md"
      justify="center"
      align="center"
      direction="column"
      wrap="wrap"
    >
      <Title order={1}>{data?.idea.name}</Title>
      {data?.idea.icon && (
        <Image
          src={data?.idea.icon}
          height={200}
          radius="sm"
          fit="contain"
          alt="アイデアイメージ"
        />
      )}
    </Flex>
  )
}
