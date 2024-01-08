import { Group, Text, Paper, Flex } from '@mantine/core'
import { CommentType } from '@/types/idea'
import { FormatDate } from '@/utils/common'
import { UserIcon } from '@/components/user'
import { TextWithLinks } from '@/utils/Text'
import Link from 'next/link'
import { useCurrentUser } from '@/context/CurrentUserContext'

export const Comment = ({ comment }: CommentType) => {
  const { description, createdAt, user, userId } = comment
  const commentCreatedAt = new Date(createdAt)
  const isCurrentUser =
    currentUser && user && String(currentUser.id) === String(user.id)

  const userContents = [
    <Link key="icon" href={`/users/${user.id}`} passHref>
      <UserIcon userIcon={user.image} />
    </Link>,
    <Text key="name">{user.name}</Text>,
  ]

  return (
    <>
      <Flex
        p="xs"
        direction="column"
        wrap={isCurrentUser ? 'wrap' : 'wrap-reverse'}
      >
        <Flex justify={isCurrentUser ? 'flex-end' : 'flex-start'}>
          <Flex direction="column">
            <Group justify={isCurrentUser ? 'flex-end' : 'flex-start'}>
              {isCurrentUser ? userContents.reverse() : userContents}
            </Group>
            <Paper
              bg="#FFFFFF"
              maw="30rem"
              p="md"
              mt="3px"
              radius="lg"
              style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}
            >
              <TextWithLinks>{description}</TextWithLinks>
            </Paper>
            <Flex justify={isCurrentUser ? 'flex-end' : 'flex-start'}>
              <Text c="gray" mx="xs">
                {FormatDate(commentCreatedAt)}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
