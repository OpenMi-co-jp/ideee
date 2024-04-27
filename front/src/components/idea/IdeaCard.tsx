import { Text, Paper, Flex, Stack } from '@mantine/core'
import Link from 'next/link'
import type { FC } from 'react'
import { IdeaBoxType } from '@/types/idea'
import { Tag } from '@/components/tag'

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
        <Link href={`/ideas/${idea.id}`} key={idea.id}>
          <Paper shadow="md" radius="md" p="md" withBorder>
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
                <Text
                  style={{
                    overflowWrap: 'break-word',
                  }}
                >
                  {idea.name}
                </Text>
              </Flex>
              <Flex justify="flex-start" align="center" wrap="wrap">
                {idea.ideaTags?.map((tag) => (
                  <Tag tagName={tag.name} key={tag.id} size="sm" />
                ))}
              </Flex>
            </Stack>
          </Paper>
        </Link>
      ))}
    </Flex>
  )
}
