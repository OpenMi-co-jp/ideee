import { useGetMessagesQuery } from '@/lib/generated/client'
import { useRouter } from 'next/router'

export const useGetRoomMessages = () => {
  const { id } = useRouter().query

  const { data, loading, error, refetch } = useGetMessagesQuery({
    variables: {
      teamId: id as string,
    },
  })

  return { data, loading, error, refetch }
}
