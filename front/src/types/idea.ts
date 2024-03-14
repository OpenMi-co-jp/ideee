export type IdeaBoxType = {
  id: string
  name?: string | null
  user: {
    __typename?: 'User'
    image?: string | null
  }
  ideaTags?: Array<{
    __typename?: 'Tag'
    id?: string | null
    name: string
  }> | null
}

export type AccompaniedTagType = {
  tag: {
    id: string
    name: string
  }
}
