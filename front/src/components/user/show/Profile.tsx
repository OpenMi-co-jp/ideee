import { LinkComponent } from '@/components/user/show'
import { useUser } from '@/context/userProfileContext'
import { Divider, Flex, Paper, Text } from '@mantine/core'
import { IconComponent } from '@/components/user/show/iconComponent'

export const Profile = () => {
  const user = useUser()

  return (
    <>
      <IconComponent />
      <Flex direction={'column'} gap="xs">
        <Text style={{ fontWeight: 'bold' }} fz="1.5rem" mx="2.3rem">
          {user?.name}
        </Text>
        <LinkComponent />
      </Flex>
      <Paper shadow="sm" p="md">
        <Text p="sm" w="100%">
          {user?.description}
        </Text>
      </Paper>
      <Divider />
    </>
  )
}
