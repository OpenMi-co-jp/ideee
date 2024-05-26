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
 * @returns {{ isLike: boolean, toggleLike: () => void }} 「いいね」状態とトグル処理のハンドラ
 */
export const useToggleLike = (
  id: number,
  likableType: string
): { isLike: boolean; toggleLike: () => void; addCount: number } => {
  const { likes } = useGetLikesQuery().data || {}
  const [isLike, setLike] = useState(false)
  const [addCount, setAddCount] = useState(0)

  useEffect(() => {
    setLike(
      likes?.some(
        (like) => like.likableId === id && like.likableType === likableType
      ) ?? false
    )
  }, [id, likes, likableType])

  const [createLike] = useCreateLikeMutation({
    variables: {
      input: {
        likableType: likableType,
        likableId: id,
      },
    },
  })

  const [destroyLike] = useDestroyLikeMutation({
    variables: {
      input: {
        likableType: likableType,
        likableId: id,
      },
    },
  })

  const toggleLike = useCallback(() => {
    const mutation = isLike ? destroyLike : createLike
    mutation().then(() => {
      setLike(!isLike)
      setAddCount(isLike ? -1 : 1)
    })
  }, [createLike, destroyLike, isLike])

  return { isLike, toggleLike, addCount }
}
