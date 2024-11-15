import { Flex, Text } from '@mantine/core'
import Link from 'next/link'
import { UserIcon } from '@/components/user'
import { useIdea } from '@/context/IdeaContext'

export const UserSection = () => {
  const idea = useIdea()

  return (
    <Flex py="lg" pl="md" justify="space-between" align="center">
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
    </Flex>
  )
}
