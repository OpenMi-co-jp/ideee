import { showSuccess } from '@/components/showNotification'
import { useJoinTeamMutation } from '@/lib/generated/client'
import { useParams } from 'next/navigation'
import { useGetTeam } from '@/utils/hooks/useGetTeam'

export const useJoinTeam = () => {
  const id = useParams()?.id as string
  const { refetch } = useGetTeam()

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
        refetch()
      }
    })
  }
  return {
    handleJoinTeam,
  }
}
