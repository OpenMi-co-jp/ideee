import { LinkComponent, Features } from '@/components/user/show'
import { useUser } from '@/context/userProfileContext'
import { Grid, Flex, Paper, Text, Center } from '@mantine/core'
import { TextWithLinks } from '@/utils/Text'
import { UserImage } from '@/components/image'

export const Profile = () => {
  const user = useUser()
  const defaultIcon = '/img/undefined_user_icon.webp'
  const icon = user?.image || defaultIcon

  return (
    <>
      <Grid>
        <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
          <Center>
            <Flex direction="column" align="center">
              <UserImage src={icon} />
              <Text style={{ fontWeight: 'bold' }} fz="1.5rem" my="xs">
                {user?.name}
              </Text>
              <LinkComponent />
            </Flex>
          </Center>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 8, lg: 8 }}>
          <Features />
        </Grid.Col>
      </Grid>
      {user?.description && (
        <Paper shadow="sm" p="md">
          <TextWithLinks>{user?.description}</TextWithLinks>
        </Paper>
      )}
    </>
  )
}
