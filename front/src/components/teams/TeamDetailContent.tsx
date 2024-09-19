import { IdeaImage } from '@/components/image/IdeaImage'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { useGetIdeaQuery, useGetTeamQuery } from '@/lib/generated/client'
import { getUserType } from '@/utils/getUserType'
import { Box, Container, Flex, Group, Image, Text, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconUsers } from '@tabler/icons-react'
import { useParams } from 'next/navigation'
import { DestroyTeamModal } from '@/components/teams/destroy/DestroyTeamModal'
import { TeamMenu } from '@/components/teams/edit/TeamMenu'

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
  const [opened, { open, close }] = useDisclosure(false)

  // 無駄な取得が入るので、オブジェクトに含めてもらう必要あり。
  const { data: idea } = useGetIdeaQuery({
    variables: {
      id: String(team?.ideaId),
    },
  })

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
        {idea?.idea.iconUrl && <IdeaImage src={idea?.idea.iconUrl} />}
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
          }}
        >
          お願いしたいこと
        </Title>
        <Text p={6} mb="xl">
          {team?.requirement}
        </Text>
      </Box>
      {currentUser?.id === team?.ownerId && (
        <div>
          <TeamMenu teamID={team?.id as string} open={open} />
          <DestroyTeamModal opened={opened} onClose={close} />
        </div>
      )}
    </Container>
  )
}
