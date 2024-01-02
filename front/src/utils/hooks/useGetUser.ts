import { useRouter } from 'next/router'
import { useGetUserQuery } from '@/lib/generated/client'

export const useGetUser = () => {
  const { id } = useRouter().query
  const { data, loading, error, refetch } = useGetUserQuery({
    variables: {
      id: id as string,
    },
  })

  return { data, loading, error, refetch }
}
