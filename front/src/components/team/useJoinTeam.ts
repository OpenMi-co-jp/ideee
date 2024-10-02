import { showSuccess } from '@/components/showNotification'
import { useJoinTeamMutation } from '@/lib/generated/client'
import { useApolloClient } from '@apollo/client'
import { useParams } from 'next/navigation'

export const useJoinTeam = () => {
  const id = useParams()?.id as string
  const client = useApolloClient()

  const [joinTeam] = useJoinTeamMutation({
    variables: {
      input: {
        teamId: id,
      },
    },
  })

  const handleJoinTeam = async () => {
    joinTeam().then(async (res) => {
      if (res.data?.joinTeam?.success) {
        showSuccess({ action: 'チーム参加' })
      }
      await client.resetStore()
    })
  }
  return {
    handleJoinTeam,
  }
}
