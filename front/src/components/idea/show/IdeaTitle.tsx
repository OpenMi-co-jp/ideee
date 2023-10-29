import { Image, Title, Flex } from '@mantine/core'
import { useIdea } from '@/context/IdeaContext'

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
      {idea?.icon && (
        <Image
          src={idea?.icon}
          height={200}
          radius="sm"
          fit="contain"
          alt="アイデアイメージ"
        />
      )}
    </Flex>
  )
}
