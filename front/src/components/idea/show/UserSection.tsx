import { UserIcon } from '@/components/user'
import { useIdea } from '@/context/IdeaContext'
import { Button, Flex, Text } from '@mantine/core'
import { IconBrandTeams } from '@tabler/icons-react'
import Link from 'next/link'

export const UserSection = () => {
  const idea = useIdea()

  return (
    <Flex py="lg" pl="xl" justify="space-between" align="center">
      <div>
        <Link href={`/users/${idea.userId}`} passHref>
          <Flex align="center" gap="xs">
            <UserIcon
              userIcon={idea.user?.image ? String(idea.user.image) : undefined}
            />
            <Text size="xl">{idea.user?.name}</Text>
          </Flex>
        </Link>
      </div>
      <Link href={`/teams/new`}>
        <Button
          variant="gradient"
          gradient={{ from: 'orange', to: 'yellow' }}
          leftSection={<IconBrandTeams size={20} />}
          radius="xl"
        >
          チーム開発
        </Button>
      </Link>
    </Flex>
  )
}
