import { Text, Paper, Avatar, Flex, Stack, Box } from '@mantine/core'
import Link from 'next/link'
import type { FC } from 'react'
import { IdeaBoxType } from '@/types/idea'
import { Tag } from '@/components/tag'
import { NewBadge } from '@/components/idea/option/NewBadge'

export const IdeaBox: FC<IdeaBoxType> = ({
  id,
  name,
  user,
  ideaTags,
  publishedAt,
}) => {
  // 1ヶ月以内に公開されたアイデア
  const isNew =
    publishedAt &&
    new Date(publishedAt).getTime() >= Date.now() - 30 * 24 * 60 * 60 * 1000

  return (
    <Link href={`/ideas/${id}`}>
      <Paper shadow="md" radius="md" p="md" withBorder>
        <Flex
          justify="space-between"
          direction="row"
          wrap="wrap"
          gap="xs"
          w={{ base: 280, md: 340 }}
        >
          <Stack
            gap="xs"
            align="stretch"
            w={{ base: 220, md: 280 }}
            style={{
              height: '80px',
              overflow: 'hidden',
            }}
          >
            <Text
              lineClamp={2}
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                height: '50px',
              }}
            >
              {name}
            </Text>
            <Flex
              justify="flex-start"
              align="center"
              wrap="wrap"
              style={{ height: '30px' }}
            >
              {ideaTags?.map((tag) => (
                <Tag tagName={tag.name} key={tag.id} size="sm" />
              ))}
            </Flex>
          </Stack>
          <Flex
            justify="space-between"
            align="flex-end"
            direction="column"
            gap="md"
          >
            {isNew && <NewBadge />}
            {user?.image && <Avatar radius="xl" size={24} src={user?.image} />}
          </Flex>
        </Flex>
      </Paper>
    </Link>
  )
}
