import { Flex } from '@mantine/core'
import { useIdea } from '@/context/IdeaContext'
import { Tag } from '@/components/tag'

export const IdeaTagList = () => {
  const idea = useIdea()

  return (
    <Flex justify="left" align="center" direction="row" mb="sm" wrap="wrap">
      {idea.ideaTags?.map((tag) => {
        return <Tag tagName={tag.name} key={tag.id} />
      })}
    </Flex>
  )
}
