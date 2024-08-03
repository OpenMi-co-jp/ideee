export type IdeaBoxType = {
  id: string
  name?: string | null
  user?: {
    __typename?: 'User'
    image?: string | null
  }
  ideaTags?: Array<{
    __typename?: 'Tag'
    id?: string | null
    name: string
  }> | null
  publishedAt?: string | null
}

export type AccompaniedTagType = {
  tag: {
    id: string
    name: string
  }
}

export type IdeasType = {
  __typename?: 'Ideas'
  nodes: Array<{
    __typename?: 'Idea'
    id: string
    name: string
    publishedAt?: any | null
    ideaTags?: Array<{
      __typename?: 'Tag'
      id?: string | null
      name: string
    }> | null
  }>
  pageInfo?: {
    __typename?: 'Pagination'
    currentPage: number
    isFirst?: boolean | null
    isLast?: boolean | null
    nextPage?: number | null
    per: number
    prevPage?: number | null
    totalCount?: number | null
    totalPages?: number | null
  } | null
}

export type aiIdeaTitleType = {
  title: string | null
}
