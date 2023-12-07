import { Group, Text } from '@mantine/core'
import { UserIcon } from '@/components/user'
import { useIdea } from '@/context/IdeaContext'
import Link from 'next/link'

export const UserSection = () => {
  const idea = useIdea()

  return (
    <Group py="lg" pl="xl">
      <Link href={`/users/${idea.userId}`} passHref>
        <UserIcon userIcon={String(idea.user?.icon)} />
        <Text size="xl">{idea.user?.name}</Text>
      </Link>
    </Group>
  )
}
