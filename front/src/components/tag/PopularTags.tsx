import { Paper, Title, Flex, Skeleton, Box } from '@mantine/core'
import { useGetPopularTagsQuery } from '@/lib/generated/client'
import { IconRocket } from '@tabler/icons-react'
import { AlertError } from '@/components/alert'
import { Tag } from '@/components/tag'

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
        <Title order={2} m="md" c="#3F3F3F">
          人気のタグ
        </Title>
      </Flex>
      <Flex justify="center" align="center" wrap="wrap" py="md">
        {tags?.map((tag) => {
          return (
            <Box key={tag.id} m="xs">
              <Tag tagName={tag.name} />
            </Box>
          )
        })}
      </Flex>
    </Paper>
  )
}
