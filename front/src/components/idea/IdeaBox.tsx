import { Text, Paper, Avatar, Flex } from '@mantine/core'
import Link from 'next/link'
import type { FC } from 'react'
import { IdeaBoxType } from '@/types/idea'

export const IdeaBox: FC<IdeaBoxType> = ({ id, name, user }) => {
  return (
    <Link href={`/idea/${id}`}>
      <Paper shadow="md" radius="md" p="md" withBorder>
        <Flex justify="center" direction="row" wrap="wrap" gap="md">
          <Avatar
            radius="xl"
            miw="45px"
            h={{ base: 45, md: 60 }}
            w={{ base: 45, md: 60 }}
            m="auto"
          />
          <Text
            w={{ base: 180, md: 250 }}
            style={{
              overflowWrap: 'break-word',
            }}
          >
            {name}
          </Text>
          <Avatar
            radius="xl"
            size={24}
            src={user?.icon || user?.remoteUrl}
            mt="xl"
          />
        </Flex>
      </Paper>
    </Link>
  )
}
