import { LinkComponent } from '@/components/user/show'
import { useUser } from '@/context/userProfileContext'
import { Divider, Paper, Text } from '@mantine/core'
import { IconComponent } from './iconComponent'

export const Profile = () => {
  const user = useUser()

  return (
    <>
      
        <IconComponent/>
      
      
          <Text
            style={{ fontWeight: 'bold' }}
            fz="1.3rem"
            mx="2.3rem"
            >
            {user?.name}
          </Text>
          
          <LinkComponent />
          
        <Paper shadow="sm" p="md">
          <Text p="sm" w="100%">
            {user?.description}
          </Text>
        </Paper>
        <Divider />
      
    </>
  )
}
