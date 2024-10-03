import { useLeaveTeamMutation } from '@/lib/generated/client'
import { useParams } from 'next/navigation'
import { useGetTeam } from '@/utils/hooks/useGetTeam'
import { showSuccess } from '@/components/showNotification'

export const useLeaveTeam = (onClose: () => void) => {
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
        onClose()
        showSuccess({ action: 'チーム脱退' })
        refetch()
      }
    })
  }
  return {
    handleLeaveTeam,
  }
}
