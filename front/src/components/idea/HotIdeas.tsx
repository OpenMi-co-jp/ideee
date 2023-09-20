import { Title, Loader, Paper, Flex } from '@mantine/core'
import { useGetHotIdeasQuery } from '@/lib/generated/client'
import { IdeaList } from '@/components/idea'
import { IconConfetti } from '@tabler/icons-react'

export const HotIdeas = () => {
  const { loading, data } = useGetHotIdeasQuery()
  if (loading) return <Loader color="yellow" />

  return (
    <Paper
      shadow="xs"
      radius="lg"
      py="xl"
      my="xl"
      style={{ border: 'thick double #FFD6AF' }}
    >
      <Flex justify="left" align="center" direction="row" wrap="nowrap" mx="xl">
        <Paper shadow="sm" radius="md" p="sm">
          <IconConfetti size={30} stroke={1.5} />
        </Paper>
        <Title order={2} mx="xl" my="md" color="orange">
          新しいアイデア
        </Title>
      </Flex>
      <IdeaList ideas={data?.hotIdeas} />
    </Paper>
  )
}
