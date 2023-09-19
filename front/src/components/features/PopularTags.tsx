import React from 'react'
import { Paper, Title, Badge, Flex, Loader, Skeleton } from '@mantine/core'
import { useGetPopularTagsQuery } from '@/lib/generated/client'
import Link from 'next/link'

export const PopularTags = () => {
  const { loading, data } = useGetPopularTagsQuery()
  if (loading) return <Loader color="yellow" />
  const Tags = data?.popularTags

  return (
    <Paper shadow="lg" radius="md" p="lg" my="md">
      <Skeleton visible={loading}>
        <Title order={2} m="md">
          人気のタグ
        </Title>
        <Flex justify="center" align="center" wrap="wrap">
          {Tags?.map((tag) => {
            return (
              <Link href={`/search?tag=${tag.name}`} key={tag.name}>
                <Badge
                  key={tag.name}
                  color="gray"
                  size="xl"
                  radius="lg"
                  m="sm"
                  variant="gradient"
                  gradient={{ from: '#f7eac0', to: '#ebcaca' }}
                  style={{ color: 'gray' }}
                >
                  {tag.name}
                </Badge>
              </Link>
            )
          })}
        </Flex>
      </Skeleton>
    </Paper>
  )
}
