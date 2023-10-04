import { Flex } from '@mantine/core'
import { IdeaBoxType } from '@/types/idea'
import { IdeaBox } from './show/IdeaBox'

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
      mx="md"
    >
      {ideas?.map((idea) => {
        return <IdeaBox key={idea.id} {...idea} />
      })}
    </Flex>
  )
}
