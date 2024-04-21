import { Text, Paper, Flex, Stack } from '@mantine/core'
import Link from 'next/link'
import type { FC } from 'react'
import { IdeaBoxType } from '@/types/idea'
import { Tag } from '@/components/tag'
import { IdeaMenu } from '@/components/idea/option/IdeaMenu'

export type IdeasType = {
  ideas: Array<IdeaBoxType> | undefined
}

export const IdeaCard: FC<IdeasType> = ({ ideas }) => {
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
      {ideas?.map((idea: IdeaBoxType) => (
        <Paper shadow="md" radius="md" p="md" withBorder key={idea.id}>
          <Stack gap="xs" align="flex-start" w={{ base: 220, md: 280 }}>
            <Flex
              direction="row"
              wrap="wrap"
              gap="md"
              style={{
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              <Link href={`/ideas/${idea.id}`}>
                <Text
                  style={{
                    overflowWrap: 'break-word',
                  }}
                >
                  {idea.name}
                </Text>
              </Link>
              <IdeaMenu ideaId={idea.id} />
            </Flex>
            <Flex justify="flex-start" align="center" wrap="wrap">
              {idea.ideaTags?.map((tag) => (
                <Tag tagName={tag.name} key={tag.id} size="sm" />
              ))}
            </Flex>
          </Stack>
        </Paper>
      ))}
    </Flex>
  )
}
