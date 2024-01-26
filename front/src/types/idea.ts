export type IdeaBoxType = {
  id: string
  name?: string | null
  user: {
    __typename?: 'User'
    image?: string | null
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
      id?: string | null | undefined
      name?: string | null | undefined
      image?: string | null | undefined
    }
  }
}
