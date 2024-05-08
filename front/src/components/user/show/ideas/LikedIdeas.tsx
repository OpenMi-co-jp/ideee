import { useGetLikedIdeasQuery } from '@/lib/generated/client'
import { useUser } from '@/context/userProfileContext'
import { BaseUserIdeas } from './BaseUserIdeas'

const PAGE_SIZE = 10

export const LikedIdeas = () => {
  const user = useUser()
  const { loading, data, error, refetch } = useGetLikedIdeasQuery({
    variables: {
      userId: user?.id || '',
      per: PAGE_SIZE,
    },
  })

  return (
    <BaseUserIdeas
      loading={loading}
      ideas={data?.likedIdeas || null}
      error={error}
      refetch={refetch}
      pageSize={PAGE_SIZE}
      emptyMessage="ハートをつけたアイデアがありません"
    />
  )
}
