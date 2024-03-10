import { Badge, Title, Flex } from '@mantine/core'
import { useIdea } from '@/context/IdeaContext'
import { IdeaImage } from '@/components/image'

export const IdeaTitle = () => {
  const idea = useIdea()

  return (
    <>
      {idea?.draft && (
        <Badge color="gray" size="xl" radius="lg" m="xs">
          下書き
        </Badge>
      )}
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
    </>
  )
}
