import { Button, Flex, Group, Text } from '@mantine/core'
import { UserIcon } from '@/components/user'
import { useIdea } from '@/context/IdeaContext'
import Link from 'next/link'
import { IconArrowRight, IconBrandTeams } from '@tabler/icons-react'

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
      <Link href={`${idea.id}/teams/`}>
        <Button
          variant="gradient"
          gradient={{ from: 'orange', to: 'yellow', deg: 90 }}
          leftSection={<IconBrandTeams size={20} />}
          radius="xl"
        >
          チーム開発
        </Button>
      </Link>
    </Flex>
  )
}
