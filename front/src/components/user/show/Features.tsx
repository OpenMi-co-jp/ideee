import { useUser } from '@/context/userProfileContext'
import { Grid, Box, Text, Center, Flex } from '@mantine/core'
import { CustomDonutChart } from '@/lib/mantine/CustomDonutChart'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { ProgressBar } from '@/components/user/show/ProgressBar'

type UserType = 'エンジニア' | 'アイディアマン' | ''

const aiLimit = Number(process.env.NEXT_PUBLIC_aiLimit) || 5

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
  const owner = currentUser && String(currentUser?.id) === user?.id

  return (
    <Grid mb={20}>
      {owner && (
        <Grid.Col span={{ base: 12, xs: 12, sm: 12, md: 12 }}>
          <ProgressBar user={user} />
        </Grid.Col>
      )}
      <Grid.Col span={{ base: 12, xs: 6, sm: 6, md: 4 }}>
        <UserInfoBox label="タイプ" value={userType} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 6, sm: 6, md: 4 }}>
        <UserInfoBox label="Contributions" value={String(user?.point)} />
      </Grid.Col>
      {owner && (
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
                  size={120}
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
