import { IdeaImage } from '@/components/image/IdeaImage'
import { TeamMenu } from '@/components/teams/edit/TeamMenu'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { useGetTeamQuery } from '@/lib/generated/client'
import { getUserType } from '@/utils/getUserType'
import {
  Box,
  Container,
  Flex,
  Group,
  Image,
  Paper,
  Text,
  Title,
} from '@mantine/core'
import { IconUsers } from '@tabler/icons-react'
import { useParams } from 'next/navigation'

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
      <Flex
        gap="md"
        justify="center"
        align="center"
        direction="column"
        wrap="wrap"
        mb="xl"
      >
        <Title order={1}>{team?.idea.name}</Title>
        {team?.idea.iconUrl && <IdeaImage src={team.idea.iconUrl} />}
      </Flex>
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

      <Flex align="center" justify="space-between" mb="xl">
        <Flex align="center" gap="md">
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
          <Box>
            <Text size="xl" fw={'600'}>
              {team?.owner.name}
            </Text>
            <Text size="sm" c="gray">
              {userType}
            </Text>
          </Box>
        </Flex>
      </Flex>

      <Paper bg="#FCFCFC" radius="md" px="xl" pt="lg" pb={1}>
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
          }}
        >
          お願いしたいこと
        </Title>
        <Text p={6} mb="xl">
          {team?.requirement}
        </Text>
      </Paper>
      {currentUser?.id === team?.ownerId && (
        <TeamMenu teamID={team?.id as string} />
      )}
    </Container>
  )
}
