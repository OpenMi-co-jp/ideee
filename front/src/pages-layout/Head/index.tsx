import { FC } from 'react'
import Head from 'next/head'
import { ColorSchemeScript } from '@mantine/core'
import { defaultOgp } from '@/lib/cloudinary/ogpImage'

interface MetaData {
  pageTitle?: string
  pageDescription?: string
  pagePath?: string
  pageImg?: string
  pageKeywords?: string
}

export const HeadBlock: FC<MetaData> = ({
  pageTitle,
  pageDescription = 'エンジニアとアイデアのマッチングプラットフォーム',
  pagePath,
  pageImg,
  pageKeywords,
}) => {
  const title = `${pageTitle || 'アイディー'} | ideee`
  const description =
    pageDescription || 'エンジニアとアイデアのマッチングプラットフォーム'
  const url = pagePath || 'https://ideee.tech'
  const imgUrl = pageImg || defaultOgp()
  const keywords = pageKeywords || 'アイデア,エンジニア,マッチング'

  return (
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ja_JP" />
      <meta property="og:image" content={imgUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@ideee_tech" />
      <link rel="icon" href="/favicon.ico" />
      <ColorSchemeScript />
    </Head>
  )
}
