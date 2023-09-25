import React from 'react'
import { Paper, Title, Flex, Skeleton, Badge } from '@mantine/core'
import { useGetPopularTagsQuery } from '@/lib/generated/client'
import { IconRocket } from '@tabler/icons-react'
import Link from 'next/link'
import { AlertError } from '@/components/alert'

export const PopularTags = () => {
  const { loading, data, error } = useGetPopularTagsQuery()
  if (loading) return <Skeleton />
  if (error) return <AlertError />
  const tags = data?.popularTags

  return (
    <Paper shadow="md" radius="md" p="lg" my="md">
      <Flex justify="left" align="center" direction="row" mb="xl" wrap="nowrap">
        <Paper shadow="sm" radius="md" p="sm">
          <IconRocket size={30} stroke={1.5} />
        </Paper>
        <Title order={2} m="md" color="#3F3F3F">
          人気のタグ
        </Title>
      </Flex>
      <Flex justify="center" align="center" wrap="wrap" py="md">
        {tags?.map((tag) => {
          return (
            <Link
              href={`/search?name_or_idea_tags_name_cont=${tag.name}`}
              key={tag.name}
            >
              <Badge
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
    </Paper>
  )
}
