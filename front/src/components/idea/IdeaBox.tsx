import { NewBadge } from '@/components/idea/option/NewBadge'
import { Tag } from '@/components/tag'
import { IdeaBoxType } from '@/types/idea'
import { Avatar, Flex, Paper, Text } from '@mantine/core'
import Link from 'next/link'
import type { FC } from 'react'

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
    <Link href={`/ideas/${id}`} passHref>
      <Paper
        shadow="md"
        radius="md"
        p="md"
        withBorder
        style={{ position: 'relative' }}
      >
        {isNew && (
          <div
            style={{
              position: 'absolute',
              top: -10,
              right: 5,
            }}
          >
            <NewBadge />
          </div>
        )}
        <Flex
          justify="space-between"
          direction="column"
          wrap="wrap"
          gap="xs"
          w={{ base: 280, md: 340 }}
        >
          <Flex gap="xs" align="flex-start" justify="space-between">
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

            {user?.image && <Avatar radius="xl" size={24} src={user?.image} />}
          </Flex>

          <Flex
            justify="flex-start"
            align="center"
            wrap="wrap"
            style={{ height: '30px' }}
            gap="xs"
          >
            {ideaTags?.map((tag) => (
              <Tag tagName={tag.name} key={tag.id} isTruncated size="sm" />
            ))}
          </Flex>
        </Flex>
      </Paper>
    </Link>
  )
}
