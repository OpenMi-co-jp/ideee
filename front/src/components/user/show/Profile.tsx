import { IconComponent, LinkComponent } from '@/components/user/show'
import { Box, Divider, Group, Paper, Text, Stack } from '@mantine/core'
import { useUser } from '@/context/userProfileContext'

export const Profile = () => {
  const user = useUser()

  return (
    <>
      <Group>
        <IconComponent />
        <Stack gap="lg">
          <Text style={{ fontWeight: 'bold' }}>{user?.name}</Text>
          <LinkComponent />
        </Stack>
      </Group>
      <Paper shadow="sm" p="md">
        <Text p="sm" w="100%">
          {user?.description}
        </Text>
      </Paper>
      <Divider />
    </>
  )
}
