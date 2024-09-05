import { useCurrentUser } from '@/context/CurrentUserContext'
import { useGetTeamsQuery } from '@/lib/generated/client'
import { Button, Container, Flex, Paper, Text } from '@mantine/core'
import { IconBrandTeams } from '@tabler/icons-react'
import Link from 'next/link'

export default function CreateTeam() {
  const { currentUser } = useCurrentUser()
  const { data, loading, error } = useGetTeamsQuery({})

  return (
    <Container>
      <Flex justify="left" align="center" m="md" gap="xs">
        <IconBrandTeams size={30} stroke={1.5} color="orange" />
        <Text
          size="xl"
          fw={900}
          variant="gradient"
          gradient={{ from: 'orange', to: 'yellow' }}
        >
          チーム開発
        </Text>
      </Flex>

      <Paper shadow="sm" radius="lg" p="xl" withBorder>
        <Text>オーナー情報の表示、タイプ、アバター</Text>
        <Text>{currentUser?.name}</Text>
        <Text>{currentUser?.defined}</Text>
        <Text>紐づくアイディアを選択</Text>
        <Text>得られること</Text>
        <Text>お願いしたいこと。</Text>
      </Paper>
      <Flex justify="center" align="center" gap="xl" mt="md">
        <Link href={'/'}>
          <Button color="gray.6">戻る</Button>
        </Link>
        <Button color="orange.6">登録</Button>
      </Flex>
    </Container>
  )
}
