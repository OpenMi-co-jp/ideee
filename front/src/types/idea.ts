export type IdeaBoxType = {
  id: string
  name?: string | null
  user: {
    __typename?: 'User'
    icon?: string | null
  }
}

export type AccompaniedTagType = {
  tag: {
    id: string
    name: string
  }
}

export type CommentType = {
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
