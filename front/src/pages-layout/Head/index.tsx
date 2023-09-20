import Head from 'next/head'

export const HeadBlock = () => {
  const pageTitle = 'アイディー'
  const title = pageTitle ? `${pageTitle} | ` : null
  return (
    <Head>
      <title>{title}ideee</title>
      <meta
        name="description"
        content="エンジニアとアイデアのマッチングプラットフォーム"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}
