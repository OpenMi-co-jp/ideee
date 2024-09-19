import { showSuccess } from '@/components/showNotification'
import { useDestroyTeamMutation } from '@/lib/generated/client'
import { useParams } from 'next/navigation'
import router from 'next/router'

export const useDestroyTeam = (onClose: () => void) => {
  const id = useParams()?.id as string
  const [destroyTeam] = useDestroyTeamMutation({
    variables: {
      input: {
        id,
      },
    },
  })
  const handleDestroyTeam = () => {
    // チーム削除後にアイディアに戻るとモーダルが発火するので、TOPページに遷移
    destroyTeam().then((res) => {
      if (res.data?.destroyTeam?.success) {
        onClose()
        showSuccess({ action: 'チーム削除' })
        router.push(`/`)
      }
    })
  }
  return {
    handleDestroyTeam,
  }
}
