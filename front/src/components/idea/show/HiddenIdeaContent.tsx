import { Space } from '@mantine/core'
import { IdeaContents } from '@/components/idea/show'
import { IdeaOptions } from '@/components/idea/option'
import { CommentList, CommentCreateForm } from '@/components/comment'
import { useCurrentUser } from '@/context/CurrentUserContext'

export const HiddenIdeaContent = () => {
  const { currentUser } = useCurrentUser()

  return (
    <>
      <IdeaContents />
      <IdeaOptions />
      <Space h="xl" />
      <CommentList />
      {currentUser && <CommentCreateForm />}
    </>
  )
}
