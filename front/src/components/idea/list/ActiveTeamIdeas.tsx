import { Title, Paper, Flex } from '@mantine/core'
import { useGetActiveTeamIdeasQuery } from '@/lib/generated/client'
import { IdeaList } from '@/components/idea'
import { IconUsers } from '@tabler/icons-react'
import { AlertError } from '@/components/alert'
import { LoaderBox } from '@/components/features'

export const ActiveTeamIdeas = () => {
  const { loading, data, error } = useGetActiveTeamIdeasQuery()
  if (loading) return <LoaderBox />
  if (error) return <AlertError />

  return (
    <Paper
      shadow="xs"
      radius="lg"
      pt="lg"
      my="lg"
      style={{ border: 'thick double #FFECCC' }}
    >
      <Flex justify="left" align="center" direction="row" wrap="nowrap" mx="xl">
        <Paper shadow="sm" radius="md" p="sm">
          <IconUsers size={30} stroke={1.5} />
        </Paper>
        <Title order={2} mx="xl" my="md" c="#E5AA37">
          チーム開発募集中のアイデア
        </Title>
      </Flex>
      <IdeaList ideas={data?.activeTeamIdeas} />
    </Paper>
  )
}
