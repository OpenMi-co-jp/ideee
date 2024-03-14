import { Group, Text, Flex } from '@mantine/core'
import { UserIcon } from '@/components/user'
import Link from 'next/link'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { CommentBody } from '@/components/comment/CommentBody'
import { CommentEditForm } from '@/components/comment'
import { useComment } from '@/context/CommentContext'

export const Comment = () => {
  const { currentUser } = useCurrentUser()
  const { comment, isEditing } = useComment()
  const { user } = comment
  if (!user || !currentUser) return null

  const isCurrentUser = String(currentUser.id) === user.id

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
          {/* 編集中か否かによって表示を切り替え */}
          {isEditing ? (
            <CommentEditForm />
          ) : (
            <CommentBody isCurrentUser={isCurrentUser} />
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}
