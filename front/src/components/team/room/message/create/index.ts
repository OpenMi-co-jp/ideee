import { useGetRoomMessages } from '@/utils/hooks/useGetRoomMessages'
import { useGetTeam } from '@/utils/hooks/useGetTeam'
import { zodResolver } from '@hookform/resolvers/zod'
import { RoomMessageSchema } from '@/components/team/room/RoomMessageSchema'
import {
  CreateMessageInput,
  useCreateMessageMutation,
} from '@/lib/generated/client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const useMessagesAction = () => {
  const { data: team } = useGetTeam()
  const { refetch } = useGetRoomMessages()

  const RoomMessageSchema = z.object({
    content: z.string().min(1, { message: 'メッセージを入力してください' }),
  })

  const form = useForm<CreateMessageInput>({
    defaultValues: { content: '' },
    resolver: zodResolver(RoomMessageSchema),
    mode: 'onChange',
  })

  const [createMessageMutation, { data, loading, error }] =
    useCreateMessageMutation({})
}
