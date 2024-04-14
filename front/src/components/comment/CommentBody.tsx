import { Text, Paper, Flex } from '@mantine/core'
import { TextWithLinks } from '@/utils/Text'
import { CommentAction } from '@/components/comment/CommentAction'
import { useComment } from '@/context/CommentContext'
import dayjs from '@/lib/format/dayjs'

export const CommentBody = ({ isCurrentUser }: { isCurrentUser: boolean }) => {
  const { comment } = useComment()
  const { description, createdAt, user } = comment

  const commentCreatedAt = new Date(createdAt)

  return (
    <>
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
          {dayjs(commentCreatedAt).format('YYYY-MM-DD HH:mm')}
        </Text>
        {isCurrentUser && <CommentAction />}
      </Flex>
    </>
  )
}
