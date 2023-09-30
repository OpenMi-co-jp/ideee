import React from 'react'
import { CommentType } from '@/types/idea'

export const Comment = ({ comment }: CommentType) => {
  const { description, createdAt, user } = comment
  return (
    <>
      <div>{description}</div>
      <div>{createdAt}</div>
      <div>{user.name}</div>
      <div>{user.icon}</div>
    </>
  )
}
