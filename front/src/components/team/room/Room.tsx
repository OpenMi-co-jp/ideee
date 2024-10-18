import { RoomMessage } from '@/components/team/room/message/RoomMessage'
import { useGetRoomMessages } from '@/utils/hooks/useGetRoomMessages'
import { Divider, Paper, ScrollArea, Title } from '@mantine/core'
import { RoomMessageCreate } from './message/create/RoomMessageCreate'
import { useEffect, useRef } from 'react'

export const Room = () => {
  const { data } = useGetRoomMessages()
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [data])

  return (
    <>
      <Paper bg="#fef6eb" radius="md" p="xs" m="lg">
        <Title order={3} size="xl" p="sm" c="gray">
          トークルーム
        </Title>
        <Divider size="sm" my="xs" color="gray" />
        <ScrollArea h={400} viewportRef={scrollAreaRef}>
          {data?.messages.map((message) => (
            <RoomMessage key={message.id} message={message} />
          ))}
        </ScrollArea>
      </Paper>
      <RoomMessageCreate />
    </>
  )
}
