import { IconHeartFilled, IconHeart } from '@tabler/icons-react'
import { Button } from '@mantine/core'
import { useToggleLike } from '@/components/like/useToggleLike'
import { useRouter } from 'next/router'

/**
 * Likeコンポーネントは、アイデアに対する「いいね」の切り替え機能を提供します。
 * @returns Button, IconHeartFilled, IconHeart
 */
export const Like = () => {
  const { id } = useRouter().query
  const { isLike, toggleLike } = useToggleLike(Number(id), 'Idea')

  return (
    <Button onClick={toggleLike} variant="transparent" px="xs">
      {isLike ? (
        <IconHeartFilled style={{ color: 'black' }} />
      ) : (
        <IconHeart style={{ color: 'black' }} />
      )}
    </Button>
  )
}
