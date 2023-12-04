import { LinkComponent } from '@/components/user/show'
import { IconComponent } from '@/components/user/show/iconComponent'
import { useUser } from '@/context/userProfileContext'
import { Box, Flex, Paper, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

export const Profile = () => {
  const user = useUser()
  const isMobile = useMediaQuery('(min-width: 26em)')

  return (
    <>
      <Box mx="2rem">
        <Flex justify={isMobile ? 'flex-start' : 'center'}>
          <IconComponent />
        </Flex>
        <Flex align={isMobile ? 'flex-start' : 'center'} direction={'column'}>
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
    </>
  )
}
