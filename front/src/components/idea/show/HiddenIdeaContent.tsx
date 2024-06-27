import { Space } from '@mantine/core'
import { IdeaContents } from '@/components/idea/show'
import { IdeaOptions } from '@/components/idea/option'
import { CommentList, CommentCreateForm } from '@/components/comment'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { ReviewList } from '@/components/review/ReviewList'

export const HiddenIdeaContent = () => {
  const { currentUser } = useCurrentUser()

  return (
    <>
      <IdeaContents />
      <IdeaOptions />
      <Space h="xs" />
      {currentUser && <ReviewList />}
      <CommentList />
      {currentUser && <CommentCreateForm />}
    </>
  )
}
