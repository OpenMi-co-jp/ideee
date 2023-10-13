import { Group, Text } from '@mantine/core'
import { FormatDate } from '@/utils/common'
import { useIdea } from '@/context/IdeaContext'
import { IdeaMenu } from './IdeaMenu'
import { Like } from './Like'
import { XShare } from './XShare'
import { UrlCopy } from './UrlCopy'

export const IdeaOptions = () => {
  const idea = useIdea()

  const createdAt = new Date(idea?.createdAt)

  return (
    <Group py="lg" mr="lg" align="apart">
      <Group>
        <Like />
        <XShare />
        <UrlCopy />
        <IdeaMenu />
      </Group>
      <Text size="md" color="gray">
        {FormatDate(createdAt)}
      </Text>
    </Group>
  )
}
