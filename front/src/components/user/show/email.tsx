//import { useUser } from '@/context/userProfileContext';
import { Text, Anchor, Paper } from '@mantine/core'
import { IconPaperBag } from '@tabler/icons-react'

export default function UserEmail() {
  //const user = useUser();
  //if (!user || !user.email) {
  //return null;
  //}

  return (
    <Paper bg="transparent" ml="1rem">
      <Text>mail:</Text>
      <Anchor></Anchor>
    </Paper>
  )
}
