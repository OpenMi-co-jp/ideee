import { showSuccess } from '@/components/showNotification'
import { useDestroyMessageMutation } from '@/lib/generated/client'
import { useGetRoomMessages } from '@/utils/hooks/useGetRoomMessages'

export const useDestroyMessage = (onClose: () => void, messageId = '') => {
  const { refetch } = useGetRoomMessages()
  const [destroyMessage] = useDestroyMessageMutation({
    variables: {
      input: {
        messageId,
      },
    },
  })
  const handleDestroyMessage = () => {
    destroyMessage().then((res) => {
      if (res.data?.destroyMessage?.success) {
        onClose()
        showSuccess({ action: 'メッセージ削除' })
        refetch()
      }
    })
  }
  return {
    handleDestroyMessage,
  }
}
