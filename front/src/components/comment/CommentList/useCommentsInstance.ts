import { useIdea } from '@/context/IdeaContext'
import { useGetCommentsQuery } from '@/lib/generated/client'

export const useCommentsInstance = () => {
  const idea = useIdea()
  const { data, refetch } = useGetCommentsQuery({
    variables: {
      ideaId: idea.id,
    },
  })

  return { data, refetch }
}
