import { useGetIdeaQuery } from '@/lib/generated/client'

export default function testQuery() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, loading, error } = useGetIdeaQuery({
    variables: {
      id: '1',
    },
  })

  return { loading, data }
}
