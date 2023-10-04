import { useRouter } from 'next/router'
import { Group, Loader, Text } from '@mantine/core'
import { useGetIdeaQuery } from '@/lib/generated/client'
import { UserIcon } from '@/components/user'

export const UserSection = () => {
  const router = useRouter()
  const { data, loading, error } = useGetIdeaQuery({
    variables: {
      id: router.query.id as string,
    },
  })

  if (loading) return <Loader color="yellow" />

  return (
    <Group py="lg" pl="xl">
      <UserIcon userIcon={String(data?.idea.user.icon)} />
      <Text size="xl">{data?.idea.user.name}</Text>
    </Group>
  )
}
