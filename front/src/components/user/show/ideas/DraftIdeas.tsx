import { useGetDraftIdeasQuery } from '@/lib/generated/client'
import { BaseUserIdeas } from './BaseUserIdeas'

const PAGE_SIZE = 10

export const DraftIdeas = () => {
  const { loading, data, error, refetch } = useGetDraftIdeasQuery({
    variables: {
      per: PAGE_SIZE,
    },
  })

  return (
    <BaseUserIdeas
      loading={loading}
      ideas={data?.draftIdeas || null}
      error={error}
      refetch={refetch}
      pageSize={PAGE_SIZE}
      emptyMessage="下書きのアイデアがありません"
    />
  )
}
