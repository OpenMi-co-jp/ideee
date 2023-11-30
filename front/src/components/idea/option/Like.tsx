import { IconHeartFilled, IconHeart } from '@tabler/icons-react'
import { Button } from '@mantine/core'
import {
  useCreateLikeMutation,
  useDestroyLikeMutation,
  useGetLikesQuery,
} from '@/lib/generated/client'
import { useRouter } from 'next/router'
import { useCallback, useState, useEffect } from 'react'

export const Like = () => {
  const { id } = useRouter().query
  const { data: likes } = useGetLikesQuery()
  const [isLike, setLike] = useState(false)

  useEffect(() => {
    if (likes) {
      setLike(likes.likes.some((like) => like.likableId === Number(id)))
    }
  }, [id, likes])

  const [createLike, createResult] = useCreateLikeMutation({
    variables: {
      input: {
        likableType: 'Idea',
        likableId: Number(id),
      },
    },
  })
  
  const [destroyLike, destroyResult] = useDestroyLikeMutation({
    variables: {
      input: {
        likableId: Number(id),
        likableType: 'Idea',
      },
    },
  })

  const createDestroyHandler = useCallback(() => {
    if (isLike) {
      destroyLike()
      setLike(false)
    } else {
      createLike()
      setLike(true)
    }
  }, [createLike, destroyLike, isLike])

  return (
    <Button
      onClick={() => createDestroyHandler()}
      variant="transparent"
      px="xs"
    >
      {isLike ? (
        <IconHeartFilled style={{ color: 'black' }} />
      ) : (
        <IconHeart style={{ color: 'black' }} />
      )}
    </Button>
  )
}
