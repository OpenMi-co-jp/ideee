import { Text, Paper } from '@mantine/core'
import { useUser } from '@/context/userProfileContext'

export default function UserName() {

  const user = useUser();

  return (
    <Paper bg="transparent" ml="1rem" style={{ fontWeight: 'bold' }}>
      <Text>{user?.name}</Text>
    </Paper>
  )
}
