export type IdeaBoxType = {
  id: string
  name?: string | null
  user: {
    __typename?: 'User'
    icon?: string | null
  }
}
