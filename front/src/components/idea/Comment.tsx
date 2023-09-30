import React from 'react'

type Comment = {
  comment: {
    id: string
    description: string
    createdAt: string
    user: {
      name?: string | null | undefined
      icon?: string | null | undefined
    }
  }
}

export const Comment = ({ comment }: Comment) => {
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
