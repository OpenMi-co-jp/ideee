import { useLeaveTeamMutation } from '@/lib/generated/client'
import { useApolloClient } from '@apollo/client'
import { useParams } from 'next/navigation'
import { showSuccess } from '../showNotification'

export const useLeaveTeam = () => {
  const id = useParams()?.id as string
  const client = useApolloClient()

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
      }
      await client.resetStore()
    })
  }
  return {
    handleLeaveTeam,
  }
}
