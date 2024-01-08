import { Group, Text, Paper, Center } from '@mantine/core'
import { CommentType } from '@/types/idea'
import { FormatDate } from '@/utils/common'
import { UserIcon } from '@/components/user'
import { TextWithLinks } from '@/utils/Text'
import Link from 'next/link'

export const Comment = ({ comment }: CommentType) => {
  const { description, createdAt, user, userId } = comment
  const commentCreatedAt = new Date(createdAt)
  return (
    <>
      <Center m="lg">
        <Link href={`/users/${user.id}`} passHref>
          <UserIcon userIcon={user.icon} />
        </Link>

        <Group p="xs">
          <Paper bg="#FFFFFF" maw="30rem" p="md" radius="lg">
            <TextWithLinks>{description}</TextWithLinks>
          </Paper>
          <Text c="gray">{FormatDate(commentCreatedAt)}</Text>
        </Group>
      </Center>
    </>
  )
}
