import { showError, showSuccess } from '@/components/showNotification'
import {
  CreateMessageInput,
  useCreateMessageMutation,
} from '@/lib/generated/client'
import { useGetRoomMessages } from '@/utils/hooks/useGetRoomMessages'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const useMessagesCreate = () => {
  const id = useParams()?.id as string
  const { refetch } = useGetRoomMessages()

  const RoomMessageSchema = z.object({
    content: z.string().min(1, { message: 'メッセージを入力してください' }),
  })

  const form = useForm<CreateMessageInput>({
    defaultValues: { content: '' },
    resolver: zodResolver(RoomMessageSchema),
    mode: 'onChange',
  })

  const [createMessageMutation] = useCreateMessageMutation()

  const onSubmit = (formData: CreateMessageInput) => {
    createMessageMutation({
      variables: {
        input: {
          teamId: id,
          content: formData.content,
        },
      },
    }).then((response) => {
      if (response.data?.createMessage?.success) {
        showSuccess({ action: 'メッセージ作成' })
        refetch()
        form.reset()
      } else {
        showError({
          action: 'メッセージ作成',
          message: String(response.data!.createMessage!.errors),
        })
      }
    })
  }
  return { form, onSubmit }
}
