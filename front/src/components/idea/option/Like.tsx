import { IconHeartFilled, IconHeart } from '@tabler/icons-react'
import { Button } from '@mantine/core'
import {
  useCreateLikeMutation,
  useDestroyLikeMutation,
  useGetLikesQuery,
} from '@/lib/generated/client'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

export const Like = () => {
  const { id } = useRouter().query
  const { data: likes } = useGetLikesQuery()
  const [isLike, setLike] = useState(
    likes?.likes.find((like) => like.likableId == Number(id)) ? true : false
  )
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

  const createDestroyHandler = useCallback(async () => {
    if (isLike) {
      await destroyLike().then(() => {
        setLike(false)
      })
    } else {
      await createLike().then(() => {
        setLike(true)
      })
    }
    console.log(createResult.data?.createLike)
  }, [createLike, createResult.data?.createLike, destroyLike, isLike])

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
