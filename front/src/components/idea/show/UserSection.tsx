import { Group, Text } from '@mantine/core'
import { UserIcon } from '@/components/user'
import { useIdea } from '@/context/IdeaContext'

export const UserSection = () => {
  const idea = useIdea()

  return (
    <Group py="lg" pl="xl">
      <UserIcon userIcon={String(idea.user?.icon)} />
      <Text size="xl">{idea.user?.name}</Text>
    </Group>
  )
}
