import { IconHeartFilled, IconHeart } from '@tabler/icons-react'
import { Button } from '@mantine/core'
import { useToggleLike } from '@/components/like/useToggleLike'
import { useRouter } from 'next/router'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { showError } from '@/components/showNotification'

/**
 * Likeコンポーネントは、アイデアに対する「いいね」の切り替え機能を提供します。
 * @returns Button, IconHeartFilled, IconHeart
 */
export const Like = () => {
  const router = useRouter()
  const { id } = router.query
  const { isLike, toggleLike } = useToggleLike(Number(id), 'Idea')
  const { currentUser } = useCurrentUser()

  const handleLikeClick = () => {
    if (currentUser) {
      toggleLike()
    } else {
      showError({
        action: 'ハート追加',
        message: 'ログインしてください',
      })
      // ログインしていない場合は、ログインページに遷移する
      router.push('/users/sign_in')
    }
  }

  return (
    <Button onClick={handleLikeClick} variant="transparent" px="xs">
      {isLike ? (
        <IconHeartFilled style={{ color: 'black' }} />
      ) : (
        <IconHeart style={{ color: 'black' }} />
      )}
    </Button>
  )
}
