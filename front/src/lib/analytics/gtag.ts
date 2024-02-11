export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || ''
// TODO: デプロイ時にプロパティを設定

export const pageview = (url: string) => {
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  })
}
