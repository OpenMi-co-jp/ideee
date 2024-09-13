import { useCurrentUser } from '@/context/CurrentUserContext'
import {
  useGetIdeaQuery,
  useGetTeamQuery,
  useGetUserQuery,
} from '@/lib/generated/client'
import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  Image,
  Text,
  Title,
} from '@mantine/core'
import { IconUsers } from '@tabler/icons-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function TeamDetailContent() {
  const params = useParams()
  const teamID = params?.id as string
  const { currentUser } = useCurrentUser()

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

  console.log(currentUser, team?.team.ownerId)
  return (
    <Container>
      <Box>
        <Group align="center" mb="xl">
          <IconUsers size={30} stroke={2} color="orange" />
          <Title order={2}>
            <Text
              fw={900}
              variant="gradient"
              gradient={{ from: 'orange', to: 'yellow' }}
              inherit
            >
              チーム開発
            </Text>
          </Title>
        </Group>
      </Box>

      <Flex align="center" justify="space-between">
        <Flex align="center" gap="md" mb="xl">
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
            <Text size="xl" fw={'600'}>
              {user?.user.name}
            </Text>
            <Text size="sm" c="gray">
              {user?.user.description}
            </Text>
          </Flex>
        </Flex>

        {/* TODO 編集画面 オーナーだけ操作可能なように修正 現在のユーザーとチームのオーナーが一致している場合は、表示する。*/}
        {currentUser?.id === team?.team.ownerId && (
          <Link href={`/teams/${teamID}/edit`}>
            <Button color="orange.6" radius="xl">
              チーム編集
            </Button>
          </Link>
        )}
      </Flex>

      <Box mx="sm">
        <Title
          size="h4"
          fw={600}
          p={10}
          style={{
            borderLeft: '5px solid #FD7E13',
          }}
        >
          得られること
        </Title>
        <Text p={6} mb="xl">
          {team?.team.offer}
        </Text>
        <Title
          size="h4"
          fw={600}
          p={10}
          style={{
            borderLeft: '5px solid #FD7E13',
            padding: '',
          }}
        >
          お願いしたいこと
        </Title>
        <Text p={6} mb="xl">
          {team?.team.requirement}
        </Text>
      </Box>
      {/* <Text>チームに参加する機能</Text>
      <Text>
        ログイン中のユーザーとこのチームの発足者の場合は、本画面上で編集画面ボタンを設ける。編集画面情報で削除機能をつける。
      </Text> */}

      <Flex justify="end" align="center" gap="xl" mt="xl">
        <Link href={`/ideas/${idea?.idea.id}`}>
          <Button color="gray.6" radius="xl">
            戻る
          </Button>
        </Link>
      </Flex>
    </Container>
  )
}
