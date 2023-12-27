import { LinkComponent, Features } from '@/components/user/show'
import { useUser } from '@/context/userProfileContext'
import { Grid, Flex, Paper, Text, Image, Center } from '@mantine/core'
import { TextWithLinks } from '@/utils/Text'

export const Profile = () => {
  const user = useUser()
  const iconRef = '/img/undefined_user_icon.webp'
  const icon = user?.icon || user?.remoteUrl || iconRef

  return (
    <>
      <Grid>
        <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
          <Center>
            <Flex direction="column" align="center">
              <Image
                src={icon}
                alt="ユーザーアイコン"
                radius="50%"
                width={120}
                height={120}
                maw={150}
                mah={150}
              />
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
