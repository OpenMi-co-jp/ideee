import { Text, Paper, Avatar, Flex, Stack } from '@mantine/core'
import Link from 'next/link'
import type { FC } from 'react'
import { IdeaBoxType } from '@/types/idea'
import { Tag } from '@/components/tag'

export const IdeaBox: FC<IdeaBoxType> = ({ id, name, user, ideaTags }) => {
  return (
    <Link href={`/ideas/${id}`}>
      <Paper shadow="md" radius="md" p="md" withBorder>
        <Flex justify="center" direction="row" wrap="wrap" gap="md">
          <Stack gap="xs" align="flex-start" w={{ base: 220, md: 280 }}>
            <Text
              style={{
                overflowWrap: 'break-word',
              }}
            >
              {name}
            </Text>
            <Flex justify="flex-start" align="center" wrap="wrap">
              {ideaTags?.map((tag) => {
                return <Tag tagName={tag.name} key={tag.id} size="sm" />
              })}
            </Flex>
          </Stack>
          {user?.image && (
            <Flex justify="flex-end" direction="column">
              <Avatar radius="xl" size={24} src={user?.image} mt="" />
            </Flex>
          )}
        </Flex>
      </Paper>
    </Link>
  )
}
