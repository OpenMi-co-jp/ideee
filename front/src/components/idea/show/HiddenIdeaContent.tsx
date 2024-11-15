import { Space } from '@mantine/core'
import { IdeaContents } from '@/components/idea/show'
import { IdeaOptions } from '@/components/idea/option'
import { CommentList, CommentCreateForm } from '@/components/comment'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { ReviewList } from '@/components/review/ReviewList'
import { AiBrushUp } from '@/components/aiBrushUp/index'
import { useIdea } from '@/context/IdeaContext'

export const HiddenIdeaContent = () => {
  const { currentUser } = useCurrentUser()
  const { id, draft, userId } = useIdea()

  return (
    <>
      <IdeaContents />
      <IdeaOptions />
      <Space h="xs" />
      {currentUser && <ReviewList />}
      {currentUser && currentUser?.id === userId && <AiBrushUp />}
      <CommentList />
      {currentUser && <CommentCreateForm />}
    </>
  )
}
