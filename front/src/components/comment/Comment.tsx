import { Group, Text, Paper } from '@mantine/core'
import { CommentType } from '@/types/idea'
import { FormatDate } from '@/utils/common'
import { UserIcon } from '@/components/user'

export const Comment = ({ comment }: CommentType) => {
  const { description, createdAt, user } = comment
  const commentCreatedAt = new Date(createdAt)
  return (
    <>
      <Group m="lg" align="center">
        <UserIcon userIcon={user.icon} />
        <Group p="xs">
          <Paper bg="#FFFFFF" maw="30rem" p="md" radius="lg">
            {description}
          </Paper>
          <Text c="gray">{FormatDate(commentCreatedAt)}</Text>
        </Group>
      </Group>
    </>
  )
}
