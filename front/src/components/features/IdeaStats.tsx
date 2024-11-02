import { Paper, Text, Flex, Title, ThemeIcon } from '@mantine/core'
import { IconBulb } from '@tabler/icons-react'
import { useGetIdeaCountQuery } from '@/lib/generated/client'

export const IdeaStats = () => {
  const { data, loading, error } = useGetIdeaCountQuery()

  if (loading) return <p>取得中...</p>

  return (
    <Paper py="md" mb="md">
      <Flex
        justify="left"
        align="center"
        direction="row"
        px="lg"
        mb="sm"
        wrap="nowrap"
      >
        <ThemeIcon size="lg" radius="md" variant="light" color="yellow">
          <IconBulb size={20} />
        </ThemeIcon>
        <Title order={5} m="xs" c="#3F3F3F">
          現在のアイデア数
        </Title>
      </Flex>
      <Text ta="center" fw={700} size="2rem" c="brown">
        {data?.ideaCount}
      </Text>
    </Paper>
  )
}
