import { useUser } from '@/context/userProfileContext'
import { Grid, Flex, Box, Text, Center } from '@mantine/core'

export const Features = () => {
  const user = useUser()

  return (
    <>
      <Grid>
        <Grid.Col span={{ base: 12, xs: 6, sm: 6, md: 4 }}>
          <Box
            p="md"
            style={{ borderRadius: '5%', border: '1px solid #dcdcdc' }}
          >
            <Center>
              <Flex direction="column" align="center" gap="md">
                <Text c="gray">タイプ</Text>
                <Text fz="1.4rem">{user?.definition}</Text>
              </Flex>
            </Center>
          </Box>
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6, sm: 6, md: 4 }}>
          <Box
            p="md"
            style={{ borderRadius: '5%', border: '1px solid #dcdcdc' }}
          >
            <Center>
              <Flex direction="column" align="center" gap="md">
                <Text c="gray">Contributions</Text>
                <Text fz="1.4rem">{user?.point}</Text>
              </Flex>
            </Center>
          </Box>
        </Grid.Col>
        {/* TODO: 追加要素を加える */}
      </Grid>
    </>
  )
}
