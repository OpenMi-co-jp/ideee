import React from 'react'
import { Group, Image, Text, Paper } from '@mantine/core'
import { CommentType } from '@/types/idea'
import { FormatDate } from '@/utils/common'
export const Comment = ({ comment }: CommentType) => {
  const { description, createdAt, user } = comment
  const formatedCreatedAt = createdAt ? new Date(createdAt) : null
  return (
    <>
      <Group m="lg" position="center">
        <Image
          height={30}
          width={30}
          radius={30}
          src={user.icon}
          alt="user prof"
        />
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
