import { useUser } from '@/context/userProfileContext'
import { Grid, Flex, Box, Text, Center } from '@mantine/core'
import { CustomDonutChart } from '@/lib/mantine/CustomDonutChart'

export const Features = () => {
  const user = useUser()
  const todaysAiLogCount = user?.todaysAiLogCount || 0
  const remainingAiLogCount = 3 - todaysAiLogCount

  return (
    <Grid>
      <Grid.Col span={{ base: 12, xs: 6, sm: 6, md: 4 }}>
        <UserInfoBox label="タイプ" value={user?.definition || ''} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 6, sm: 6, md: 4 }}>
        <UserInfoBox label="Contributions" value={String(user?.point)} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 6, sm: 6, md: 4 }}>
        <Box p="md" style={{ borderRadius: '5%', border: '1px solid #dcdcdc' }}>
          <Center>
            <Flex direction="column" align="center" gap="md">
              <Text c="gray">本日のAI利用回数</Text>
              <CustomDonutChart
                label={`${todaysAiLogCount} / 3`}
                data={[
                  {
                    name: '残り回数',
                    value: remainingAiLogCount,
                    color: 'orange',
                  },
                  { name: '利用回数', value: todaysAiLogCount, color: 'gray' },
                ]}
              />
            </Flex>
          </Center>
        </Box>
      </Grid.Col>
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
