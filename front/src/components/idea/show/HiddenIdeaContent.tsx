import { Group, Button } from '@mantine/core'
import { IdeaContent } from '@/components/idea/show'
import { CommentList } from '@/components/comment'
export const HiddenIdeaContent = () => {
  return (
    <>
      <IdeaContent />
      <CommentList />
      <Group position="center">
        <Button type="submit" size="lg" bg="#EAAE59">
          送信
        </Button>
      </Group>
    </>
  )
}
