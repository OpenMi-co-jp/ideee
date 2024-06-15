import { Space } from '@mantine/core'
import { IdeaContents } from '@/components/idea/show'
import { IdeaOptions } from '@/components/idea/option'
import { CommentList, CommentCreateForm } from '@/components/comment'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { ReviewList } from '@/pages/ideas/[id]/_components/review'

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
