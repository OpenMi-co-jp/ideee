import { IconHeartFilled, IconHeart } from '@tabler/icons-react'
import { Button, Transition, Text, Flex, Tooltip } from '@mantine/core'
import { useToggleLike } from '@/components/like/useToggleLike'
import { useRouter } from 'next/router'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { showError } from '@/components/showNotification'
import { useIdea } from '@/context/IdeaContext'
import { useEffect, useState } from 'react'

/**
 * Likeコンポーネントは、アイデアに対する「いいね」の切り替え機能を提供します。
 * @returns Button, IconHeartFilled, IconHeart
 */
export const Like = () => {
  const { likesCount, userId } = useIdea()
  const router = useRouter()
  const { id } = router.query
  const { isLike, toggleLike, addCount } = useToggleLike(Number(id), 'Idea')
  const { currentUser } = useCurrentUser()
  const isOwnUser = userId == currentUser?.id
  const [likesCountState, setLikesCountState] = useState(0)

  useEffect(() => {
    setLikesCountState(likesCount || 0)
  }, [likesCount])

  useEffect(() => {
    setLikesCountState((prev) => prev + addCount)
  }, [addCount])

  if (isOwnUser)
    return (
      <>
        <IconHeart style={{ color: 'black' }} />
        <Text c="gray">{likesCount}</Text>
      </>
    )

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
    <Button onClick={handleLikeClick} variant="transparent" px={0}>
      <Flex align="center" gap="xs">
        <Transition mounted={isLike} duration={300} transition="fade-left">
          {(styles) => (
            <div style={styles}>
              <IconHeartFilled style={{ color: 'red' }} />
            </div>
          )}
        </Transition>
        <Transition mounted={!isLike} duration={300} transition="fade-right">
          {(styles) => (
            <div style={styles}>
              <Tooltip label="ほしい!" withArrow>
                <div>
                  <IconHeart style={{ color: 'black' }} />
                </div>
              </Tooltip>
            </div>
          )}
        </Transition>
        {likesCountState > 0 && <Text c="gray">{likesCountState}</Text>}
      </Flex>
    </Button>
  )
}
