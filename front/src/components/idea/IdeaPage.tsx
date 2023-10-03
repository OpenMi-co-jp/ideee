import { Group, Button } from '@mantine/core'
import {
  UserIcon,
  AccompaniedTagList,
  IdeaTitle,
  IdeaContent,
  CommentList,
} from '@/components/idea'
export const IdeaPage = () => {
  return (
    <>
      <IdeaTitle />
      <UserIcon />
      <AccompaniedTagList />
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
