import { IconHeartFilled, IconHeart } from '@tabler/icons-react'
import { Button } from '@mantine/core'
import { useToggle } from '@mantine/hooks'
import type { Idea } from '@/lib/generated/client'

type LikeProps = {
  idea?: Idea
}

export const Like = ({ idea }: LikeProps) => {
  const [like, toggleLike] = useToggle([false, true])
  return (
    <Button onClick={() => toggleLike()} variant="transparent" px="xs">
      {like ? <IconHeartFilled /> : <IconHeart />}
    </Button>
  )
}
