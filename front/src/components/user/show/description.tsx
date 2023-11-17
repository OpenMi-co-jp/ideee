import { Text, Paper } from '@mantine/core'
import { useUser } from '@/context/userProfileContext'

export default function UserDescription() {
  const user = useUser()
    return (
      <Paper bg="transparent">
        <Text p="sm" w="100%">
          {user?.description}
        </Text>
      </Paper>
    )
}
