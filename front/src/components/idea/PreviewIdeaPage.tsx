import React from 'react'
import {
  UserIcon,
  AccompaniedTagList,
  IdeaTitle,
  IdeaContent,
  PreviewIdeaContent,
} from '@/components/idea'
export const PreviewIdeaPage = () => {
  return (
    <>
      <IdeaTitle />
      <UserIcon />
      <AccompaniedTagList />
      <PreviewIdeaContent />
    </>
  )
}
