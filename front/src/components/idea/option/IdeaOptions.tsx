import { Flex, Group, Text } from '@mantine/core'
import dayjs from '@/lib/format/dayjs'
import { useIdea } from '@/context/IdeaContext'
import { IdeaMenu } from './IdeaMenu'
import { Like } from './Like'
import { XShare } from './XShare'
import { UrlCopy } from './UrlCopy'
import { useCurrentUser } from '@/context/CurrentUserContext'

export const IdeaOptions = () => {
  const idea = useIdea()
  const { currentUser } = useCurrentUser()

  const createdAt = new Date(idea?.createdAt)

  return (
    <Flex py="lg" mr="lg" align="apart" justify="space-between">
      <Group>
        <Like />
        <XShare />
        <UrlCopy />
        {currentUser?.id === idea?.userId && <IdeaMenu ideaId={idea.id} />}
      </Group>
      <Text size="md" c="gray">
        {dayjs(createdAt).format('YYYY-MM-DD HH:mm')}
      </Text>
    </Flex>
  )
}
