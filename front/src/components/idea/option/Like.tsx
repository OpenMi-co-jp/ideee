import { IconHeartFilled, IconHeart } from '@tabler/icons-react'
import { Button } from '@mantine/core'
import { useToggleLike } from './useToggleLike'
import { useRouter } from 'next/router'

/**
 * Likeコンポーネントは、アイデアに対する「いいね」の切り替え機能を提供します。
 * @returns {JSX.Element} Likeボタンを含んだReact要素
 */
export const Like = (): JSX.Element => {
  const { id } = useRouter().query
  const { isLike, createDestroyHandler } = useToggleLike(Number(id), 'Idea')

  return (
    <Button onClick={createDestroyHandler} variant="transparent" px="xs">
      {isLike ? (
        <IconHeartFilled style={{ color: 'black' }} />
      ) : (
        <IconHeart style={{ color: 'black' }} />
      )}
    </Button>
  )
}
