import { useCurrentUser } from '@/context/CurrentUserContext'
import { useLeaveTeamMutation } from '@/lib/generated/client'
import { useParams } from 'next/navigation'
import { showSuccess } from '../showNotification'

export const useLeaveTeam = () => {
  const id = useParams()?.id as string
  const { currentUser } = useCurrentUser()

  const [leaveTeam] = useLeaveTeamMutation({
    // variables: {
    //   input: {
    //     userId: String(currentUser?.id),
    //     teamId: id,
    //   },
    // },
  })

  const handleLeaveTeam = () => {
    leaveTeam().then((res) => {
      if (res.data?.leaveTeam?.success) {
        showSuccess({ action: 'チーム脱退' })
      }
    })
  }
  return {
    handleLeaveTeam,
  }
}
