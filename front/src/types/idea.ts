export type IdeaBoxType = {
  id: string
  name?: string | null
  user: {
    __typename?: 'User'
    icon?: string | null
    remoteUrl?: string | null
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
      icon?: string | null | undefined
    }
  }
}
