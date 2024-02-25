import { Image, Title, Flex } from '@mantine/core'
import { useIdea } from '@/context/IdeaContext'
import { IdeaImage } from '@/components/image'

export const IdeaTitle = () => {
  const idea = useIdea()

  return (
    <Flex
      gap="md"
      justify="center"
      align="center"
      direction="column"
      wrap="wrap"
    >
      <Title order={1}>{idea?.name}</Title>
      {idea?.iconUrl && <IdeaImage src={idea.iconUrl} />}
    </Flex>
  )
}
