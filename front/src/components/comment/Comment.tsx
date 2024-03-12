import { Group, Text, Paper, Flex } from '@mantine/core'
import { FormatDate } from '@/utils/common'
import { UserIcon } from '@/components/user'
import Link from 'next/link'
import { TextWithLinks } from '@/utils/Text'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { GetCommentQuery } from '@/lib/generated/client'
import { CommentAction } from '@/components/comment/CommentAction'

export const Comment = ({ comment }: GetCommentQuery) => {
  const { currentUser } = useCurrentUser()
  const { description, createdAt, user } = comment
  if (!user) return null
  const commentCreatedAt = new Date(createdAt)
  const isCurrentUser =
    currentUser && user && String(currentUser.id) === String(user.id)

  const userContents = [
    <UserIcon key="icon" userIcon={user.image} />,
    <Text key="name">{user.name}</Text>,
  ]

  return (
    <Flex
      p="xs"
      direction="column"
      wrap={isCurrentUser ? 'wrap' : 'wrap-reverse'}
    >
      <Flex justify={isCurrentUser ? 'flex-end' : 'flex-start'}>
        <Flex direction="column">
          <Link href={`/users/${user.id}`} passHref>
            <Group justify={isCurrentUser ? 'flex-end' : 'flex-start'} gap="xs">
              {isCurrentUser ? userContents.reverse() : userContents}
            </Group>
          </Link>
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
            {isCurrentUser && <CommentAction comment={comment} />}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
