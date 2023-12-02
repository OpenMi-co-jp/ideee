import { LinkComponent } from '@/components/user/show'
import { useUser } from '@/context/userProfileContext'
import { Box, Divider, Flex, Paper, Text } from '@mantine/core'
import { IconComponent } from '@/components/user/show/IconComponent'
import { useMediaQuery } from '@mantine/hooks'

export const Profile = () => {
  const user = useUser()
  const matches = useMediaQuery('(min-width: 26em)')

  return (
    <>
      <Box mx="2rem">
        <Flex justify={matches ? 'flex-start' : 'center'}>
          <IconComponent />
        </Flex>
        <Flex align={matches ? 'flex-start' : 'center'} direction={'column'}>
          <Text style={{ fontWeight: 'bold' }} fz="1.5rem" mx="1rem" mb="xs">
            {user?.name}
          </Text>
          <LinkComponent />
        </Flex>
      </Box>
      <Paper shadow="sm" p="md">
        <Text p="sm" w="100%">
          {user?.description}
        </Text>
      </Paper>
      <Divider />
    </>
  )
}
