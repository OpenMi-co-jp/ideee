import {
  useGetIdeaQuery,
  useGetTeamQuery,
  useGetUserQuery,
} from '@/lib/generated/client'
import { Button, Container, Flex, Image, Paper, Text } from '@mantine/core'
import { IconBrandTeams, IconUsers } from '@tabler/icons-react'

import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function TeamDetailContent() {
  const params = useParams()
  const teamID = params?.id as string

  // Team情報の取得
  const { data: team } = useGetTeamQuery({
    variables: {
      id: teamID,
    },
  })

  // Idea情報の取得
  const { data: idea } = useGetIdeaQuery({
    variables: {
      id: String(team?.team.ideaId),
    },
  })

  // userの詳細情報を取得
  const { data: user } = useGetUserQuery({
    variables: {
      id: String(idea?.idea.userId),
    },
  })

  console.log(idea, user)

  return (
    <Container>
      <Flex justify="left" align="center" m="md" gap="xs">
        <IconUsers size={30} stroke={1.5} color="orange" />
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
        <Flex align="center" gap="sm">
          {idea?.idea?.user.image && (
            <Image
              src={idea.idea.user.image}
              alt="プロフィール画像"
              className=""
              width={70}
              height={70}
              radius="50%"
            />
          )}
          <Flex direction="column">
            <Text size="xl">{idea?.idea?.user.name}</Text>
            <Text size="sm" c="gray">
              Description
            </Text>
          </Flex>
        </Flex>

        {/* <Text>紐づくアイディアを選択</Text>
        <Text>得られること</Text>
        <Text>お願いしたいこと。</Text> */}
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
