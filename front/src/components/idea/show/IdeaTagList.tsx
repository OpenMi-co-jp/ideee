import { useRouter } from 'next/router'
import { Flex, Loader } from '@mantine/core'
import { useGetIdeaQuery } from '@/lib/generated/client'
import { Tag } from '@/components/tag'

export const IdeaTagList = () => {
  const router = useRouter()
  const { data, loading, error } = useGetIdeaQuery({
    variables: {
      id: router.query.id as string,
    },
  })

  if (loading) return <Loader color="yellow" />

  return (
    <Flex justify="left" align="center" direction="row" mb="sm" wrap="wrap">
      {data?.idea.ideaTags?.map((tag) => {
        return <Tag tagName={tag.name} key={tag.id} />
      })}
    </Flex>
  )
}
