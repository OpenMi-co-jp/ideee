import { useUser } from '@/context/userProfileContext'
import { Grid, Box, Text, Center, Flex, Title, Progress } from '@mantine/core'
import { CustomDonutChart } from '@/lib/mantine/CustomDonutChart'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { GetUserQuery } from '@/lib/generated/client'

const calculateCompletionRate = (
  user: GetUserQuery['user'] | undefined
): number => {
  const ratePerField = 25
  const fields = ['name', 'description', 'definition', 'image'] as const
  return fields.reduce(
    (acc, field) => (user?.[field] ? acc + ratePerField : acc),
    0
  )
}

export const Features = () => {
  const user = useUser()
  const { currentUser } = useCurrentUser()
  const todaysAiLogCount = user?.todaysAiLogCount || 0
  const aiLimit = Number(process.env.NEXT_PUBLIC_AI_LIMIT) || 5
  const remainingAiLogCount = aiLimit - todaysAiLogCount
  const userType =
    user?.definition === 'engineer'
      ? 'エンジニア'
      : user?.definition === 'idea_engineer'
        ? 'アイディアマン'
        : ''

  const completionRateForUser = calculateCompletionRate(user)

  return (
    <Grid mb={20}>
      <Grid.Col span={{ base: 12, xs: 12, sm: 12, md: 12 }}>
        <Flex
          justify={{ base: 'center', md: 'flex-end' }}
          align="center"
          wrap="wrap"
        >
          <Title c="gray" fz="1.2rem" mb={15}>
            ユーザー情報入力完了率
            <Text span c="orange" fz="2rem" pl={5} inherit>
              {completionRateForUser}%
            </Text>
          </Title>
        </Flex>
        <Progress.Root size={20} mb={20}>
          {user?.name && (
            <Progress.Section value={25} color="cyan">
              <Progress.Label>ユーザー名</Progress.Label>
            </Progress.Section>
          )}
          {user?.description && (
            <Progress.Section value={25} color="pink">
              <Progress.Label>自己紹介文</Progress.Label>
            </Progress.Section>
          )}
          {user?.image && (
            <Progress.Section value={25} color="lime">
              <Progress.Label>プロフィール画像</Progress.Label>
            </Progress.Section>
          )}
          {user?.definition && (
            <Progress.Section value={25} color="orange">
              <Progress.Label>ユーザータイプ</Progress.Label>
            </Progress.Section>
          )}
        </Progress.Root>
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 6, sm: 6, md: 4 }}>
        <UserInfoBox label="タイプ" value={userType} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 6, sm: 6, md: 4 }}>
        <UserInfoBox label="Contributions" value={String(user?.point)} />
      </Grid.Col>
      {currentUser && String(currentUser?.id) === user?.id && (
        <Grid.Col span={{ base: 12, xs: 12, sm: 12, md: 4 }}>
          <Box
            p="md"
            style={{ borderRadius: '5%', border: '1px solid #dcdcdc' }}
          >
            <Center>
              <Flex direction="column" align="center" gap="md">
                <Text c="gray">本日のAI利用回数</Text>
                <CustomDonutChart
                  label={`${todaysAiLogCount} / ${aiLimit}`}
                  data={[
                    {
                      name: '残り回数',
                      value: remainingAiLogCount,
                      color: 'orange',
                    },
                    {
                      name: '利用回数',
                      value: todaysAiLogCount,
                      color: 'gray',
                    },
                  ]}
                />
              </Flex>
            </Center>
          </Box>
        </Grid.Col>
      )}
    </Grid>
  )
}

const UserInfoBox = ({ label, value }: { label: string; value: string }) => (
  <Box p="md" style={{ borderRadius: '5%', border: '1px solid #dcdcdc' }}>
    <Center>
      <Flex direction="column" align="center" gap="md">
        <Text c="gray">{label}</Text>
        <Text fz="1.4rem">{value}</Text>
      </Flex>
    </Center>
  </Box>
)
