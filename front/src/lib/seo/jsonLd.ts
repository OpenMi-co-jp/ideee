/**
 * JSON-LD構造化データ生成ユーティリティ
 */

// WebSiteスキーマ（サイト全体の情報）
export interface WebSiteJsonLd {
  '@context': 'https://schema.org'
  '@type': 'WebSite'
  name: string
  url: string
  description: string
  potentialAction?: {
    '@type': 'SearchAction'
    target: string
    'query-input': string
  }
}

export const generateWebSiteJsonLd = (): WebSiteJsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ideee',
  url: 'https://ideee.tech',
  description: 'エンジニアとアイデアのマッチングプラットフォーム',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://ideee.tech/search?keyword={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
})

// CreativeWorkスキーマ（アイデア用）
export interface IdeaJsonLd {
  '@context': 'https://schema.org'
  '@type': 'CreativeWork'
  name: string
  description: string
  url: string
  image?: string
  author?: {
    '@type': 'Person'
    name: string
    url: string
  }
  dateCreated?: string
  keywords?: string[]
}

export interface GenerateIdeaJsonLdParams {
  id: number
  name: string
  goal: string
  imageUrl?: string
  authorName?: string
  authorId?: number
  createdAt?: string
  tags?: string[]
}

export const generateIdeaJsonLd = ({
  id,
  name,
  goal,
  imageUrl,
  authorName,
  authorId,
  createdAt,
  tags,
}: GenerateIdeaJsonLdParams): IdeaJsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name,
  description: goal,
  url: `https://ideee.tech/ideas/${id}`,
  ...(imageUrl && { image: imageUrl }),
  ...(authorName &&
    authorId && {
      author: {
        '@type': 'Person',
        name: authorName,
        url: `https://ideee.tech/users/${authorId}`,
      },
    }),
  ...(createdAt && { dateCreated: createdAt }),
  ...(tags && tags.length > 0 && { keywords: tags }),
})

// Personスキーマ（ユーザープロフィール用）
export interface UserJsonLd {
  '@context': 'https://schema.org'
  '@type': 'Person'
  name: string
  url: string
  description?: string
  image?: string
}

export interface GenerateUserJsonLdParams {
  id: number
  name: string
  description?: string
  imageUrl?: string
}

export const generateUserJsonLd = ({
  id,
  name,
  description,
  imageUrl,
}: GenerateUserJsonLdParams): UserJsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name,
  url: `https://ideee.tech/users/${id}`,
  ...(description && { description }),
  ...(imageUrl && { image: imageUrl }),
})

// JSON-LDの型（いずれかのスキーマ）
export type JsonLdData = WebSiteJsonLd | IdeaJsonLd | UserJsonLd
