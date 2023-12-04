import { useCallback, useState, useEffect } from 'react'
import {
  useCreateLikeMutation,
  useDestroyLikeMutation,
  useGetLikesQuery,
} from '@/lib/generated/client'

/**
 * 指定されたIDとタイプのアイテムの「いいね」機能をトグルするためのカスタムフックです。
 * @param {number} id - ID
 * @param {string} likableType - 種類
 * @returns {{ isLike: boolean, createDestroyHandler: () => void }} 「いいね」状態とトグル処理のハンドラ
 */
export const useToggleLike = (
  id: number,
  likableType: string
): { isLike: boolean; createDestroyHandler: () => void } => {
  const { data: likes } = useGetLikesQuery()
  const [isLike, setLike] = useState(false)

  useEffect(() => {
    if (likes) {
      setLike(likes.likes.some((like) => like.likableId === Number(id) && like.likableType === likableType))
    }
  }, [id, likes, likableType])

  const [createLike] = useCreateLikeMutation({
    variables: {
      input: {
        likableType: likableType,
        likableId: Number(id),
      },
    },
  })

  const [destroyLike] = useDestroyLikeMutation({
    variables: {
      input: {
        likableId: Number(id),
        likableType: likableType,
      },
    },
  })

  const createDestroyHandler = useCallback(() => {
    if (isLike) {
      destroyLike().then(() => setLike(false))
    } else {
      createLike().then(() => setLike(true))
    }
  }, [createLike, destroyLike, isLike])

  return { isLike, createDestroyHandler }
}
