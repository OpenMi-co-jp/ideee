import { useGetCommentedIdeasQuery } from '@/lib/generated/client'
import { useUser } from '@/context/userProfileContext'
import { BaseUserIdeas } from './BaseUserIdeas'

const PAGE_SIZE = 10

export const CommentedIdeas = () => {
  const user = useUser()
  const { loading, data, error, refetch } = useGetCommentedIdeasQuery({
    variables: {
      userId: user?.id || '',
      per: PAGE_SIZE,
    },
  })

  return (
    <BaseUserIdeas
      loading={loading}
      ideas={data?.commentedIdeas || null}
      error={error}
      refetch={refetch}
      pageSize={PAGE_SIZE}
      emptyMessage="コメントしたアイデアがありません"
    />
  )
}
