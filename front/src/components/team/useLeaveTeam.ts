import { useLeaveTeamMutation } from '@/lib/generated/client'
import { useParams } from 'next/navigation'
import { showSuccess } from '../showNotification'
import { useGetTeam } from '@/utils/hooks/useGetTeam'

export const useLeaveTeam = () => {
  const id = useParams()?.id as string
  const { refetch } = useGetTeam()

  const [leaveTeam] = useLeaveTeamMutation({
    variables: {
      input: {
        teamId: id,
      },
    },
  })

  const handleLeaveTeam = async () => {
    leaveTeam().then(async (res) => {
      if (res.data?.leaveTeam?.success) {
        showSuccess({ action: 'チーム脱退' })
        refetch()
      }
    })
  }
  return {
    handleLeaveTeam,
  }
}
