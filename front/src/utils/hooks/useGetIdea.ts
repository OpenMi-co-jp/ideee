import { useRouter } from 'next/router'
import { useGetIdeaQuery } from '@/lib/generated/client'

export const useGetIdea = () => {
  const { id } = useRouter().query
  const { data, loading, error, refetch } = useGetIdeaQuery({
    variables: {
      id: id as string,
    },
  })

  return { data, loading, error, refetch }
}
