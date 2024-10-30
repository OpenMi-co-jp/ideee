import { SignPath } from '@/components/Auth/SignPath'
import { IdeaImage } from '@/components/image/IdeaImage'
import { TeamMenu } from '@/components/team/edit/TeamMenu'
import { TeamContent } from '@/components/team/TeamContent'
import { TeamJoinButton } from '@/components/team/TeamJoinButton'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { getUserType } from '@/utils/getUserType'
import {
  Avatar,
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
import Link from 'next/link'
import { useGetTeam } from '@/utils/hooks/useGetTeam'
import { Room } from '@/components/team/room/Room'

export default function TeamDetailContent() {
  const { currentUser } = useCurrentUser()
  const { data } = useGetTeam()
  const { team } = data || {}
  const userType = getUserType(team?.owner.definition!)
  const isOwner = team?.ownerId === currentUser?.id
  const isAlreadyJoined =
    team?.currentMember?.some(
      (user) =>
        user?.id !== undefined && String(user.id) === String(currentUser?.id)
    ) ?? false

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
            <Link href={`/users/${team?.ownerId}`} key={team.ownerId}>
              <Image
                src={team?.owner.image}
                alt="プロフィール画像"
                className=""
                width={70}
                height={70}
                radius="50%"
              />
            </Link>
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
        <Box>
          <TeamJoinButton isOwner={isOwner} isAlreadyJoined={isAlreadyJoined} />
        </Box>
      </Flex>

      {isAlreadyJoined && (
        <Avatar.Group mb="md">
          {team?.currentMember?.map((joinUser) => (
            <Link href={`/users/${joinUser.id}`} key={joinUser.id}>
              <Avatar src={joinUser?.image} />
            </Link>
          ))}
          <Avatar>{team?.currentMember?.length}</Avatar>
        </Avatar.Group>
      )}

      <Paper bg="#FCFCFC" radius="md" px="md" pt="lg" pb={1}>
        <TeamContent title="得られること" content={team?.offer!} />
        <TeamContent title="お願いしたいこと" content={team?.requirement!} />
      </Paper>

      {isOwner && <TeamMenu teamID={team?.id as string} />}

      {(isOwner || isAlreadyJoined) && <Room />}

      {(() => {
        if (!currentUser) {
          return <SignPath />
        }
      })()}
    </Container>
  )
}
