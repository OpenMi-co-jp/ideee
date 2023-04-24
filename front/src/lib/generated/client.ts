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
  /** 背景 */
  background?: Maybe<Scalars['String']>
  /** コメント数 */
  commentsNum?: Maybe<Scalars['Int']>
  /** 作成日 */
  createdAt: Scalars['ISO8601DateTime']
  /** 難易度 */
  difficulty?: Maybe<Scalars['Int']>
  /** 下書きフラグ */
  draft?: Maybe<Scalars['Boolean']>
  /** メール送信日 */
  emailedAt?: Maybe<Scalars['ISO8601DateTime']>
  /** GithubリポジトリURL */
  githubUrl?: Maybe<Scalars['String']>
  /** ゴール */
  goal?: Maybe<Scalars['String']>
  /** 仮説 */
  hypothesis?: Maybe<Scalars['String']>
  /** アイコン */
  icon?: Maybe<Scalars['String']>
  /** アイデアID */
  id: Scalars['ID']
  /** 課題・困っていること */
  issue?: Maybe<Scalars['String']>
  /** ハート数 */
  likesNum?: Maybe<Scalars['Int']>
  /** マネタイズ方法 */
  monetize?: Maybe<Scalars['String']>
  /** アイデア名 */
  name?: Maybe<Scalars['String']>
  /** 補足 */
  note?: Maybe<Scalars['String']>
  /** アプリ審査状況 */
  productApply?: Maybe<Scalars['Int']>
  /** 作っているアプリのURL */
  productUrl?: Maybe<Scalars['String']>
  /** 公開日 */
  publishedAt?: Maybe<Scalars['ISO8601DateTime']>
  /** 類似サービス */
  similar?: Maybe<Scalars['String']>
  /** 権利スタンス */
  stance?: Maybe<Scalars['Int']>
  /** ターゲット */
  target?: Maybe<Scalars['String']>
  /** 更新日 */
  updatedAt: Scalars['ISO8601DateTime']
  user: User
  /** ビュー数 */
  view?: Maybe<Scalars['Int']>
  /** 欲しい機能 */
  wishFunction?: Maybe<Scalars['String']>
}

export type Mutation = {
  __typename?: 'Mutation'
  /** An example field added by the generator */
  testField: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  /** アイデアオブジェクト */
  idea: Idea
  /** アイデア一覧 */
  ideas: Array<Idea>
  /** ユーザーオブジェクト */
  user: User
  /** ユーザー一覧 */
  users: Array<User>
}

export type QueryIdeaArgs = {
  id: Scalars['ID']
}

export type QueryUserArgs = {
  id: Scalars['ID']
}

export type User = {
  __typename?: 'User'
  /** 作成日 */
  createdAt: Scalars['ISO8601DateTime']
  /** 設定完了フラグ */
  defined?: Maybe<Scalars['Boolean']>
  /** タイプ */
  definition?: Maybe<Scalars['Int']>
  /** 自己紹介 */
  description?: Maybe<Scalars['String']>
  /** メールアドレス */
  email?: Maybe<Scalars['String']>
  /** githubID */
  githubId?: Maybe<Scalars['String']>
  /** アイコン */
  icon?: Maybe<Scalars['String']>
  /** ユーザーID */
  id: Scalars['ID']
  /** アイデア数 */
  ideasNum?: Maybe<Scalars['Int']>
  /** ユーザー名 */
  name?: Maybe<Scalars['String']>
  /** ポイント数 */
  point?: Maybe<Scalars['Int']>
  /** アイコンURL */
  remoteUrl?: Maybe<Scalars['String']>
  /** サイトURL */
  siteUrl?: Maybe<Scalars['String']>
  /** TwitterID */
  twitterId?: Maybe<Scalars['String']>
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

export type GetIdeasQueryVariables = Exact<{ [key: string]: never }>

export type GetIdeasQuery = {
  __typename?: 'Query'
  ideas: Array<{
    __typename?: 'Idea'
    id: string
    name?: string | null
    note?: string | null
    goal?: string | null
  }>
}

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type GetUserQuery = {
  __typename?: 'Query'
  user: {
    __typename?: 'User'
    id: string
    name?: string | null
    description?: string | null
    definition?: number | null
  }
}

export type GetUsersQueryVariables = Exact<{ [key: string]: never }>

export type GetUsersQuery = {
  __typename?: 'Query'
  users: Array<{
    __typename?: 'User'
    id: string
    name?: string | null
    description?: string | null
    definition?: number | null
  }>
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
export const GetIdeasDocument = gql`
  query GetIdeas {
    ideas {
      id
      name
      note
      goal
    }
  }
`

/**
 * __useGetIdeasQuery__
 *
 * To run a query within a React component, call `useGetIdeasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIdeasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIdeasQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetIdeasQuery(
  baseOptions?: Apollo.QueryHookOptions<GetIdeasQuery, GetIdeasQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetIdeasQuery, GetIdeasQueryVariables>(
    GetIdeasDocument,
    options
  )
}
export function useGetIdeasLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetIdeasQuery,
    GetIdeasQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetIdeasQuery, GetIdeasQueryVariables>(
    GetIdeasDocument,
    options
  )
}
export type GetIdeasQueryHookResult = ReturnType<typeof useGetIdeasQuery>
export type GetIdeasLazyQueryHookResult = ReturnType<
  typeof useGetIdeasLazyQuery
>
export type GetIdeasQueryResult = Apollo.QueryResult<
  GetIdeasQuery,
  GetIdeasQueryVariables
>
export const GetUserDocument = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      description
      definition
    }
  }
`

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(
  baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options
  )
}
export function useGetUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options
  )
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>
export type GetUserQueryResult = Apollo.QueryResult<
  GetUserQuery,
  GetUserQueryVariables
>
export const GetUsersDocument = gql`
  query GetUsers {
    users {
      id
      name
      description
      definition
    }
  }
`

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    options
  )
}
export function useGetUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUsersQuery,
    GetUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    options
  )
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>
export type GetUsersLazyQueryHookResult = ReturnType<
  typeof useGetUsersLazyQuery
>
export type GetUsersQueryResult = Apollo.QueryResult<
  GetUsersQuery,
  GetUsersQueryVariables
>
