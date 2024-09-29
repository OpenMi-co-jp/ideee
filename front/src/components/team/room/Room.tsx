import { UserIcon } from '@/components/user'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { TextWithLinks } from '@/utils/Text'
import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Paper,
  ScrollArea,
  Text,
  Title,
} from '@mantine/core'
import { Tabs, rem } from '@mantine/core'
import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
  IconHeart,
  IconPlus,
} from '@tabler/icons-react'
import Link from 'next/link'

export const Room = () => {
  const { currentUser } = useCurrentUser()
  // 一旦仮置き
  const isCurrentUser = true

  const userContents = [
    <UserIcon key="icon" userIcon={''} />,
    <Text key="name">TestUser</Text>,
  ]
  return (
    <Box mt="md">
      <Flex align="center" justify="space-between">
        <Title size="h4" fw={600} p={10}>
          ルーム
        </Title>
      </Flex>
      <Tabs defaultValue="room1" color="orange.5">
        <Tabs.List>
          <Tabs.Tab value="room1">Room1</Tabs.Tab>
          <Group>
            <ActionIcon
              variant="filled"
              color="orange.6"
              size="md"
              radius="xl"
              aria-label="ルームを追加"
            >
              <IconPlus size="1.1rem" />
            </ActionIcon>
          </Group>
        </Tabs.List>
        <Tabs.Panel value="room1">
          <ScrollArea h={250}>
            <Flex
              p="xs"
              direction="column"
              wrap={isCurrentUser ? 'wrap' : 'wrap-reverse'}
            >
              <Flex justify={isCurrentUser ? 'flex-end' : 'flex-start'} mt="md">
                <Paper
                  miw="15rem"
                  maw="30rem"
                  p="xs"
                  radius="lg"
                  style={{
                    wordWrap: 'break-word',
                    wordBreak: 'break-word',
                    borderColor: '#FD7E13',
                    borderWidth: '2px',
                    borderStyle: 'solid',
                  }}
                >
                  <Link href={`/users/${1}`} passHref>
                    <Group
                      justify={isCurrentUser ? 'flex-end' : 'flex-start'}
                      gap="xs"
                      mb="xs"
                    >
                      {isCurrentUser
                        ? [...userContents].reverse()
                        : userContents}
                    </Group>
                  </Link>
                  <TextWithLinks>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Quam, corrupti. Culpa optio atque eaque, facilis quae
                  </TextWithLinks>
                  <Flex
                    justify={isCurrentUser ? 'flex-end' : 'flex-start'}
                    mt="xs"
                  >
                    <Text c="gray" size="sm">
                      2024年9月29日
                    </Text>
                  </Flex>
                </Paper>
              </Flex>
            </Flex>
          </ScrollArea>
        </Tabs.Panel>
      </Tabs>
    </Box>
  )
}
