import { showError, showSuccess } from '@/components/showNotification'
import {
  UpdateMessageInput,
  useUpdateMessageMutation,
} from '@/lib/generated/client'
import { useGetRoomMessages } from '@/utils/hooks/useGetRoomMessages'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const useMessageEdit = (
  initialContent = '',
  messageId = '',
  cancelEditing: () => void
) => {
  const { refetch } = useGetRoomMessages()

  const RoomMessageSchema = z.object({
    content: z.string().min(1, { message: 'メッセージを入力してください' }),
  })

  const form = useForm<UpdateMessageInput>({
    defaultValues: { content: initialContent },
    resolver: zodResolver(RoomMessageSchema),
    mode: 'onChange',
  })

  const [updateMessageMutation] = useUpdateMessageMutation()

  const onSubmit = (formData: UpdateMessageInput) => {
    updateMessageMutation({
      variables: {
        input: {
          messageId: messageId,
          content: formData.content,
        },
      },
    }).then((response) => {
      if (response.data?.updateMessage?.success) {
        cancelEditing()
        showSuccess({ action: 'メッセージ編集' })
        refetch()
        form.reset()
      } else {
        showError({
          action: 'メッセージ編集',
          message: String(response.data!.updateMessage!.errors),
        })
      }
    })
  }
  return { form, onSubmit }
}
