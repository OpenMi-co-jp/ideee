import { Flex } from '@mantine/core'
import { IdeaBoxType } from '@/types/idea'
import { IdeaBox } from '@/components/idea'

export type IdeasType = {
  ideas: Array<IdeaBoxType> | undefined
}

export const IdeaList = ({ ideas }: IdeasType) => {
  return (
    <Flex
      justify="center"
      align="center"
      direction="row"
      wrap="wrap"
      gap="md"
      my="xl"
      mx="sm"
    >
      {ideas?.map((idea) => {
        return <IdeaBox key={idea.id} {...idea} />
      })}
    </Flex>
  )
}
