import { useJoinTeamMutation } from '@/lib/generated/client'
import { useParams } from 'next/navigation'
import { showSuccess } from '@/components/showNotification'
import { useCurrentUser } from '@/context/CurrentUserContext'

export const useJoinTeam = () => {
  const id = useParams()?.id as string
  const { currentUser } = useCurrentUser()

  const [joinTeam] = useJoinTeamMutation({
    variables: {
      input: {
        userId: String(currentUser?.id),
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
