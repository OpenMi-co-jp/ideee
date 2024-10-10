import { RoomMessage } from '@/components/team/room/message/RoomMessage'
import { useGetRoomMessages } from '@/utils/hooks/useGetRoomMessages'
import { Divider, Paper, Title } from '@mantine/core'
import { RoomMessageCreate } from './message/create/RoomMessageCreate'

export const Room = () => {
  const { data } = useGetRoomMessages()

  return (
    <>
      <Paper bg="#fef6eb" radius="md" p="xs" m="lg">
        <Title order={3} size="xl" p="sm" c="gray">
          トークルーム
        </Title>
        <Divider size="sm" my="xs" color="gray" />
        {data?.messages.map((message) => <RoomMessage key={message.id} />)}
      </Paper>
      <RoomMessageCreate />
    </>
  )
}
