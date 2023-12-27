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
  const isCurrentUser = currentUser?.id == user.id

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
              {isCurrentUser
                ? [
                    <Link key="icon" href={`/users/${user.id}`} passHref>
                      <UserIcon userIcon={user.icon} />
                    </Link>,
                    <Paper
                      key="name"
                      style={{
                        backgroundColor: '#fef6eb',
                        display: 'inline-block',
                      }}
                      mr="0.3rem"
                    >
                      {user.name}
                    </Paper>,
                  ].reverse()
                : [
                    <Link key="icon" href={`/users/${user.id}`} passHref>
                      <UserIcon userIcon={user.icon} />
                    </Link>,
                    <Paper
                      key="name"
                      style={{
                        backgroundColor: '#fef6eb',
                        display: 'inline-block',
                      }}
                      mr="0.3rem"
                    >
                      {user.name}
                    </Paper>,
                  ]}
            </Group>
            <Paper
              bg="#FFFFFF"
              maw="30rem"
              p="md"
              radius="lg"
              style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}
            >
              <TextWithLinks>{description}</TextWithLinks>
            </Paper>
            <Flex justify={isCurrentUser ? 'flex-end' : 'flex-start'}>
              <Text c="gray">{FormatDate(commentCreatedAt)}</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
