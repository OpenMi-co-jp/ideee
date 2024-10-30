import { DestroyModal } from '@/components/team/DestroyModal'
import { useJoinTeam } from '@/components/team/useJoinTeam'
import { useLeaveTeam } from '@/components/team/useLeaveTeam'
import { Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

type TeamJoinButtonProps = {
  isOwner: boolean
  isAlreadyJoined: boolean
}
export const TeamJoinButton = ({
  isOwner,
  isAlreadyJoined,
}: TeamJoinButtonProps) => {
  const { handleJoinTeam } = useJoinTeam()
  const [opened, { open, close }] = useDisclosure(false)
  const { handleLeaveTeam } = useLeaveTeam(close)

  if (isOwner) return null

  return isAlreadyJoined ? (
    <>
      <Button bg="gray.4" radius="xl" onClick={open}>
        参加中
      </Button>
      <DestroyModal
        opened={opened}
        onClose={close}
        action={handleLeaveTeam}
        confirmText="チームから離脱します。よろしいですか？"
        actionName="チーム離脱"
      />
    </>
  ) : (
    <Button bg="orange.6" radius="xl" onClick={handleJoinTeam}>
      + 参加
    </Button>
  )
}
