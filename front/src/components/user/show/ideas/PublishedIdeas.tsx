import { useGetPublishedIdeasQuery } from '@/lib/generated/client'
import { useUser } from '@/context/userProfileContext'
import { BaseUserIdeas } from './BaseUserIdeas'

const PAGE_SIZE = 10

export const PublishedIdeas = () => {
  const user = useUser()
  const { loading, data, error, refetch } = useGetPublishedIdeasQuery({
    variables: {
      userId: user?.id || '',
      per: PAGE_SIZE,
    },
  })

  return (
    <BaseUserIdeas
      loading={loading}
      ideas={data?.publishedIdeas || null}
      error={error}
      refetch={refetch}
      pageSize={PAGE_SIZE}
      emptyMessage="公開中のアイデアがありません"
    />
  )
}
