import { IconHeartFilled, IconHeart } from '@tabler/icons-react'
import { Button } from '@mantine/core'
import { useToggle } from '@mantine/hooks'
import {
  useCreateLikeMutation,
  useDestroyLikeMutation,
} from '@/lib/generated/client'
import { useRouter } from 'next/router'

export const Like = () => {
  const [like, toggleLike] = useToggle([false, true])
  const { id } = useRouter().query

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

  const createLikeHandler = () => {
    createLike().then(() => {
      console.log(createResult.data?.createLike)
    })
  }

  const destroyLikeHandler = () => {
    destroyLike().then(() => {
      console.log(destroyResult.data?.destroyLike)
    })
  }

  return (
    <Button onClick={() => destroyLikeHandler()} variant="transparent" px="xs">
      {like ? (
        <IconHeartFilled style={{ color: 'black' }} />
      ) : (
        <IconHeart style={{ color: 'black' }} />
      )}
    </Button>
  )
}
