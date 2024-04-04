import { LinkComponent, Features } from '@/components/user/show'
import { useUser } from '@/context/userProfileContext'
import { Grid, Flex, Paper, Text, Tabs, Center, rem } from '@mantine/core'
import { TextWithLinks } from '@/utils/Text'
import { UserImage } from '@/components/image'
import {
  IconBulb,
  IconHeart,
  IconMessageCircle,
  IconUsers,
  IconPencil,
} from '@tabler/icons-react'
import { useCurrentUser } from '@/context/CurrentUserContext'

export const Profile = () => {
  const user = useUser()
  const { currentUser } = useCurrentUser()
  const defaultIcon = '/img/undefined_user_icon.webp'
  const icon = user?.image || defaultIcon
  const isMyPage = String(currentUser?.id) === user?.id

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
      <Tabs color="yellow" variant="pills" defaultValue="idea_list" mt={'xl'}>
        <Tabs.List>
          <Tabs.Tab value="idea_list" leftSection={<IconBulb />}>
            アイデア
          </Tabs.Tab>
          <Tabs.Tab value="heart_list" leftSection={<IconHeart />}>
            ハート
          </Tabs.Tab>
          <Tabs.Tab value="comment_list" leftSection={<IconMessageCircle />}>
            コメント
          </Tabs.Tab>
          <Tabs.Tab value="team_list" leftSection={<IconUsers />}>
            チーム開発
          </Tabs.Tab>
          {isMyPage && (
            <Tabs.Tab value="draft" leftSection={<IconPencil />}>
              下書き
            </Tabs.Tab>
          )}
        </Tabs.List>

        <Tabs.Panel value="idea_list">
          Coming Soon <IconBulb />
        </Tabs.Panel>

        <Tabs.Panel value="heart_list">
          Coming Soon <IconHeart />
        </Tabs.Panel>

        <Tabs.Panel value="comment_list">
          Coming Soon <IconMessageCircle />
        </Tabs.Panel>

        <Tabs.Panel value="team_list">
          Coming Soon <IconUsers />
        </Tabs.Panel>

        {isMyPage && (
          <Tabs.Panel value="draft">
            Coming Soon <IconPencil />
          </Tabs.Panel>
        )}
      </Tabs>
    </>
  )
}
