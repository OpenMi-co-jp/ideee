import { Title, Loader, Paper, Flex } from '@mantine/core'
import { useGetActiveTeamIdeasQuery } from '@/lib/generated/client'
import { IdeaList } from '@/components/ideas'
import { IconUsers } from '@tabler/icons-react'

export const ActiveTeamIdeas = () => {
  const { loading, data } = useGetActiveTeamIdeasQuery()
  if (loading) return <Loader color="yellow" />

  return (
    <Paper
      shadow="xs"
      radius="lg"
      py="xl"
      my="xl"
      style={{ border: 'thick double #FFECCC' }}
    >
      <Flex justify="left" align="center" direction="row" wrap="nowrap" mx="xl">
        <Paper shadow="md" radius="md" p="sm">
          <IconUsers size={30} stroke={1.5} />
        </Paper>
        <Title order={2} mx="xl" my="md" color="#E5AA37">
          チーム開発募集中のアイデア
        </Title>
      </Flex>
      <IdeaList ideas={data?.activeTeamIdeas} />
    </Paper>
  )
}
