import { Space } from '@mantine/core'
import { IdeaContents } from '@/components/idea/show'
import { IdeaOptions } from '@/components/idea/option'
import { CommentList, CommentForm } from '@/components/comment'

export const HiddenIdeaContent = () => {
  return (
    <>
      <IdeaContents />
      <IdeaOptions />
      <Space h="xl" />
      <CommentList />
      <CommentForm />
    </>
  )
}
