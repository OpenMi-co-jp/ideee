import { useJoinTeam } from '@/components/team/useJoinTeam'
import { useLeaveTeam } from '@/components/team/useLeaveTeam'
import { Button } from '@mantine/core'

type TeamJoinButtonProps = {
  isOwner: boolean
  isAlreadyJoined: boolean
}
export const TeamJoinButton = ({
  isOwner,
  isAlreadyJoined,
}: TeamJoinButtonProps) => {
  const { handleJoinTeam } = useJoinTeam()
  const { handleLeaveTeam } = useLeaveTeam()

  if (isOwner) return null

  return isAlreadyJoined ? (
    <Button bg="gray.4" radius="xl" onClick={handleLeaveTeam}>
      参加中
    </Button>
  ) : (
    <Button bg="orange.6" radius="xl" onClick={handleJoinTeam}>
      + 参加
    </Button>
  )
}
