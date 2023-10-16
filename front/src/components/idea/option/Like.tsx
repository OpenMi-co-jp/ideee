import { IconHeartFilled, IconHeart } from '@tabler/icons-react'
import { Button } from '@mantine/core'
import { useToggle } from '@mantine/hooks'

export const Like = () => {
  const [like, toggleLike] = useToggle([false, true])

  return (
    <Button onClick={() => toggleLike()} variant="transparent" px="xs">
      {like ? (
        <IconHeartFilled style={{ color: 'black' }} />
      ) : (
        <IconHeart style={{ color: 'black' }} />
      )}
    </Button>
  )
}
