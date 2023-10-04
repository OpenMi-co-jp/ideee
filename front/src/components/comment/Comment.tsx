import React from 'react'
import { Group, Text, Paper } from '@mantine/core'
import { CommentType } from '@/types/idea'
import { FormatDate } from '@/utils/common'
import { UserIcon } from '@/components/user'

export const Comment = ({ comment }: CommentType) => {
  const { description, createdAt, user } = comment
  const formatedCreatedAt = createdAt ? new Date(createdAt) : null
  return (
    <>
      <Group m="lg" position="center">
        <UserIcon userIcon={user.icon} />
        <Group p="xs">
          <Paper bg="#FFFFFF" maw="30rem" p="md" radius="lg">
            {description}
          </Paper>
          <Text>{FormatDate(formatedCreatedAt)}</Text>
        </Group>
      </Group>
    </>
  )
}
