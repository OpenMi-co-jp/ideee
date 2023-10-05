import { Group, Button, Space } from '@mantine/core'
import { IconSend } from '@tabler/icons-react'
import { IdeaContents } from '@/components/idea/show'
import { CommentList } from '@/components/comment'
export const HiddenIdeaContent = () => {
  return (
    <>
      <IdeaContents />
      <Space h="xl" />
      <CommentList />
      <Group position="center">
        <Button
          type="submit"
          variant="light"
          size="lg"
          color="orange"
          disabled={true}
          leftIcon={<IconSend />}
        >
          Send
        </Button>
      </Group>
    </>
  )
}
