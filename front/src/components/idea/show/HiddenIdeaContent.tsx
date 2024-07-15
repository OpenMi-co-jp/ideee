import { Space } from '@mantine/core'
import { IdeaContents } from '@/components/idea/show'
import { IdeaOptions } from '@/components/idea/option'
import { CommentList, CommentCreateForm } from '@/components/comment'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { ReviewList } from '@/components/review/ReviewList'
import { AiBrushUp } from '@/components/aiBrushUp/index'

export const HiddenIdeaContent = () => {
  const { currentUser } = useCurrentUser()

  return (
    <>
      <IdeaContents />
      <IdeaOptions />
      <Space h="xs" />
      {currentUser && <ReviewList />}
      {currentUser && <AiBrushUp />}
      <CommentList />
      {currentUser && <CommentCreateForm />}
    </>
  )
}
