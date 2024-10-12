import { TextWithLinks } from '@/utils/Text'
import { RoomAction } from '@/components/team/room/message/RoomAction'
import { Flex, Paper, Text } from '@mantine/core'
import dayjs from 'dayjs'

type RoomMessageBodyProps = {
  messageId: string
  content: string
  createdAt: string
  isCurrentUser: boolean
  startEditing: () => void
}
export const RoomMessageBody = ({
  messageId,
  content,
  createdAt,
  isCurrentUser,
  startEditing,
}: RoomMessageBodyProps) => {
  return (
    <div style={{ position: 'relative' }}>
      <Paper
        bg="#FFFFFF"
        miw="15rem"
        maw="30rem"
        p="md"
        mt="3px"
        radius="lg"
        style={{
          wordWrap: 'break-word',
          wordBreak: 'break-word',
        }}
      >
        <TextWithLinks>{content}</TextWithLinks>
      </Paper>
      <Flex justify={isCurrentUser ? 'flex-end' : 'flex-start'} align="center">
        <Text c="gray" mx="xs">
          {dayjs(createdAt).format('YYYY-MM-DD HH:mm')}
        </Text>
        {isCurrentUser && (
          <RoomAction messageId={messageId} startEditing={startEditing} />
        )}
      </Flex>
    </div>
  )
}
