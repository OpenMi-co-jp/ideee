import { useUser } from '@/context/userProfileContext'
import { Grid, Box, Text, Center, Flex, Title, Progress } from '@mantine/core'
import { CustomDonutChart } from '@/lib/mantine/CustomDonutChart'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { GetUserQuery } from '@/lib/generated/client'

type UserField = 'name' | 'description' | 'definition' | 'image'
type UserType = 'エンジニア' | 'アイディアマン' | ''

const ratePerField = 25
const userFields: UserField[] = ['name', 'description', 'definition', 'image']
const aiLimit = Number(process.env.NEXT_PUBLIC_aiLimit) || 5

const calculateCompletionRate = (
  user: GetUserQuery['user'] | undefined
): number => {
  return userFields.reduce(
    (acc, field) => (user?.[field] ? acc + ratePerField : acc),
    0
  )
}

const getUserType = (definition: string | undefined): UserType => {
  switch (definition) {
    case 'engineer':
      return 'エンジニア'
    case 'idea_engineer':
      return 'アイディアマン'
    default:
      return ''
  }
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

export const Features = () => {
  const user = useUser()
  const { currentUser } = useCurrentUser()
  const todaysAiLogCount = user?.todaysAiLogCount || 0
  const remainingAiLogCount = aiLimit - todaysAiLogCount
  const userType = getUserType(user?.definition!)
  const completionRate = calculateCompletionRate(user)

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
              {completionRate}%
            </Text>
          </Title>
        </Flex>
        <Progress.Root size={20} mb={20} radius="lg">
          {userFields.map(
            (field, index) =>
              user?.[field] && (
                <Progress.Section
                  key={field}
                  value={ratePerField}
                  color={['cyan', 'pink', 'lime', 'orange'][index]}
                >
                  <Progress.Label style={{ fontSize: '12px' }}>
                    {
                      [
                        'ユーザー名',
                        '自己紹介文',
                        'プロフィール画像',
                        'タイプ',
                      ][index]
                    }
                  </Progress.Label>
                </Progress.Section>
              )
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
