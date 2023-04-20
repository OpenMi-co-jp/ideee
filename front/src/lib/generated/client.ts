import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  ISO8601DateTime: any
}

export type Idea = {
  __typename?: 'Idea'
  background?: Maybe<Scalars['String']>
  commentsNum?: Maybe<Scalars['Int']>
  createdAt: Scalars['ISO8601DateTime']
  difficulty?: Maybe<Scalars['Int']>
  draft?: Maybe<Scalars['Boolean']>
  emailedAt?: Maybe<Scalars['ISO8601DateTime']>
  githubUrl?: Maybe<Scalars['String']>
  goal?: Maybe<Scalars['String']>
  hypothesis?: Maybe<Scalars['String']>
  icon?: Maybe<Scalars['String']>
  id: Scalars['ID']
  issue?: Maybe<Scalars['String']>
  likesNum?: Maybe<Scalars['Int']>
  monetize?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  note?: Maybe<Scalars['String']>
  productApply?: Maybe<Scalars['Int']>
  productUrl?: Maybe<Scalars['String']>
  publishedAt?: Maybe<Scalars['ISO8601DateTime']>
  similar?: Maybe<Scalars['String']>
  stance?: Maybe<Scalars['Int']>
  target?: Maybe<Scalars['String']>
  updatedAt: Scalars['ISO8601DateTime']
  user: User
  userId: Scalars['Int']
  view?: Maybe<Scalars['Int']>
  wishFunction?: Maybe<Scalars['String']>
}

export type Mutation = {
  __typename?: 'Mutation'
  /** An example field added by the generator */
  testField: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  idea: Idea
}

export type QueryIdeaArgs = {
  id: Scalars['ID']
}

export type User = {
  __typename?: 'User'
  confirmationSentAt?: Maybe<Scalars['ISO8601DateTime']>
  confirmedAt?: Maybe<Scalars['ISO8601DateTime']>
  createdAt: Scalars['ISO8601DateTime']
  defined?: Maybe<Scalars['Boolean']>
  definition?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  githubId?: Maybe<Scalars['String']>
  icon?: Maybe<Scalars['String']>
  id: Scalars['ID']
  ideasNum?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  point?: Maybe<Scalars['Int']>
  provider?: Maybe<Scalars['String']>
  remoteUrl?: Maybe<Scalars['String']>
  siteUrl?: Maybe<Scalars['String']>
  twitterId?: Maybe<Scalars['String']>
  uid?: Maybe<Scalars['String']>
  updatedAt: Scalars['ISO8601DateTime']
}

export type GetIdeaQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type GetIdeaQuery = {
  __typename?: 'Query'
  idea: {
    __typename?: 'Idea'
    id: string
    name?: string | null
    note?: string | null
    goal?: string | null
  }
}

export const GetIdeaDocument = gql`
  query GetIdea($id: ID!) {
    idea(id: $id) {
      id
      name
      note
      goal
    }
  }
`

/**
 * __useGetIdeaQuery__
 *
 * To run a query within a React component, call `useGetIdeaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIdeaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIdeaQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetIdeaQuery(
  baseOptions: Apollo.QueryHookOptions<GetIdeaQuery, GetIdeaQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetIdeaQuery, GetIdeaQueryVariables>(
    GetIdeaDocument,
    options
  )
}
export function useGetIdeaLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetIdeaQuery, GetIdeaQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetIdeaQuery, GetIdeaQueryVariables>(
    GetIdeaDocument,
    options
  )
}
export type GetIdeaQueryHookResult = ReturnType<typeof useGetIdeaQuery>
export type GetIdeaLazyQueryHookResult = ReturnType<typeof useGetIdeaLazyQuery>
export type GetIdeaQueryResult = Apollo.QueryResult<
  GetIdeaQuery,
  GetIdeaQueryVariables
>
