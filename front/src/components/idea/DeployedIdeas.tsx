import { Title, Loader, Paper, Flex } from '@mantine/core'
import { useGetDeployedIdeasQuery } from '@/lib/generated/client'
import { IdeaList } from '@/components/idea'
import { IconCircleCheck } from '@tabler/icons-react'
import { AlertError } from '@/components/alert'

export const DeployedIdeas = () => {
  const { loading, data, error } = useGetDeployedIdeasQuery()
  if (loading) return <Loader color="yellow" />
  if (error) return <AlertError />

  return (
    <Paper
      shadow="xs"
      radius="lg"
      py="xl"
      my="xl"
      style={{ border: 'thick double #FBD4D6' }}
    >
      <Flex justify="left" align="center" direction="row" wrap="nowrap" mx="xl">
        <Paper shadow="sm" radius="md" p="sm">
          <IconCircleCheck size={30} stroke={1.5} />
        </Paper>
        <Title order={2} mx="xl" my="md" color="#9B6565">
          実現したアイデア
        </Title>
      </Flex>
      <IdeaList ideas={data?.deployedIdeas} />
    </Paper>
  )
}
