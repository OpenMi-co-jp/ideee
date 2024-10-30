import { Avatar, Text, Box, Paper, Flex, Title, Center } from '@mantine/core'
import { useGetUserRankingQuery } from '@/lib/generated/client'
import Link from 'next/link'
import { IconTrophy } from '@tabler/icons-react'
import { LoaderBox } from '@/components/features'
import { AlertError } from '@/components/alert'

const getRankIcon = (index: number) => {
  switch (index) {
    case 0:
      return '🥇'
    case 1:
      return '🥈'
    case 2:
      return '🥉'
    default:
      return `${index + 1}`
  }
}

export const RankList = () => {
  const { loading, data, error } = useGetUserRankingQuery()

  if (loading) return <LoaderBox />
  if (error) return <AlertError />

  const users = data?.userRanking

  return (
    <Paper shadow="md" radius="md" p="lg" my="md">
      <Flex justify="left" align="center" direction="row" mb="md" wrap="nowrap">
        <Paper shadow="sm" radius="md" p="xs">
          <Center>
            <IconTrophy size={24} stroke={1.5} />
          </Center>
        </Paper>
        <Title order={5} m="sm" c="#3F3F3F">
          月間ユーザーランキング
        </Title>
      </Flex>

      {users?.map((user, index) => (
        <Link href={`/users/${user.id}`} key={user.id} passHref>
          <Flex align="center" gap="md" py={4}>
            <Text size="lg" fw={700} w={24} style={{ textAlign: 'center' }}>
              {getRankIcon(index)}
            </Text>
            <Avatar src={user.image} size="md" radius="xl" />
            <Box>
              <Text size="md" lineClamp={1}>
                {user.name}
              </Text>
              <Text size="xs" c="dimmed">
                Contributions{' '}
                <span style={{ fontSize: '1rem' }}>{user.point}</span>
              </Text>
            </Box>
          </Flex>
        </Link>
      ))}
    </Paper>
  )
}
