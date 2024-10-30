import { RoomMessageEdit } from '@/components/team/room/message/edit/RoomMessageEdit'
import { RoomMessageBody } from '@/components/team/room/message/RoomMessageBody'
import { UserIcon } from '@/components/user'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { Message } from '@/lib/generated/client'
import { Flex, Group, Text } from '@mantine/core'
import Link from 'next/link'
import { useState } from 'react'

type RoomMessageProps = {
  message: Message
}

export const RoomMessage = ({ message }: RoomMessageProps) => {
  const { currentUser } = useCurrentUser()
  const isCurrentUser = String(currentUser?.id) === message?.user?.id
  const [isEditing, setIsEditing] = useState(false)
  const ChangeEditingStatus = () => setIsEditing(!isEditing)
  const userContents = [
    <UserIcon key="icon" userIcon={message?.user?.image} />,
    <Text key="name">{message?.user?.name}</Text>,
  ]

  return (
    <div>
      <Flex
        p="xs"
        mt="xs"
        direction="column"
        wrap={currentUser ? 'wrap' : 'wrap-reverse'}
      >
        <Flex justify={isCurrentUser ? 'flex-end' : 'flex-start'}>
          <Flex direction="column">
            <Link href={`/users/${message?.user?.id}`} passHref>
              <Group
                justify={isCurrentUser ? 'flex-end' : 'flex-start'}
                gap="xs"
              >
                {isCurrentUser ? userContents.reverse() : userContents}
              </Group>
            </Link>
            {isEditing ? (
              <RoomMessageEdit
                messageId={message.id}
                content={message.content as string}
                cancelEditing={ChangeEditingStatus}
              />
            ) : (
              <RoomMessageBody
                messageId={message.id}
                content={message.content as string}
                createdAt={message.createdAt}
                isCurrentUser={isCurrentUser}
                startEditing={ChangeEditingStatus}
              />
            )}
          </Flex>
        </Flex>
      </Flex>
    </div>
  )
}
