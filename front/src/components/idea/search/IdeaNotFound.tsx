import { Divider, Title, Button, Center } from '@mantine/core'
import { DeployedIdeas } from '@/components/idea'

export const IdeaNotFound = () => {
  return (
    <>
      <Center>
        <Title order={2} m="sm">
          当てはまるアイデアが見つかりませんでした
        </Title>
      </Center>
      <Center>
        <Button
          variant="gradient"
          gradient={{ from: 'yellow', to: 'orange' }}
          m="lg"
        >
          アイデア投稿してみる
        </Button>
      </Center>
      <Divider my="xl" py="xl" />
      <DeployedIdeas />
    </>
  )
}
