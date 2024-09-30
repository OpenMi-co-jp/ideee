import { showSuccess } from '@/components/showNotification'
import { useJoinTeamMutation } from '@/lib/generated/client'
import { useParams } from 'next/navigation'

export const useJoinTeam = () => {
  const id = useParams()?.id as string

  const [joinTeam] = useJoinTeamMutation({
    variables: {
      input: {
        teamId: id,
      },
    },
  })

  const handleJoinTeam = () => {
    joinTeam().then((res) => {
      if (res.data?.joinTeam?.success) {
        showSuccess({ action: 'チーム参加' })
      }
    })
  }
  return {
    handleJoinTeam,
  }
}
