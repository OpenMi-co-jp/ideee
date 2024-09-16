import { useCurrentUser } from '@/context/CurrentUserContext'
import { useGetTeamQuery } from '@/lib/generated/client'
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
import { getUserType } from '@/utils/getUserType'

export default function TeamDetailContent() {
  const id = useParams()?.id as string
  const { currentUser } = useCurrentUser()
  const { data } = useGetTeamQuery({
    variables: {
      id,
    },
  })
  const { team } = data || {}
  const userType = getUserType(team?.owner.definition!)

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
          {team?.owner.image && (
            <Image
              src={team?.owner.image}
              alt="プロフィール画像"
              className=""
              width={70}
              height={70}
              radius="50%"
            />
          )}
          <Flex direction="column">
            <Text size="xl" fw={'600'}>
              {team?.owner.name}
            </Text>
            <Text size="sm" c="gray">
              {userType}
            </Text>
          </Flex>
        </Flex>

        {currentUser?.id === team?.ownerId && (
          <Link href={`/teams/${id}/edit`}>
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
          {team?.offer}
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
          {team?.requirement}
        </Text>
      </Box>
    </Container>
  )
}
