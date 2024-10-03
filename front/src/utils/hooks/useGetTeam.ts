import { useRouter } from 'next/router'
import { useGetTeamQuery } from '@/lib/generated/client'

export const useGetTeam = () => {
  const { id } = useRouter().query
  const { data, loading, error, refetch } = useGetTeamQuery({
    variables: {
      id: id as string,
    },
  })

  return { data, loading, error, refetch }
}
