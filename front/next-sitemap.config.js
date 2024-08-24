import generateIdeasIds from './src/lib/generateIdeasIds'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_FRONT_URL || 'https://ideee.tech',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  exclude: ['/mypage/*', '/ideas/new', '/user/*'],
  // 動的ルーティングの設定
  additionalPaths: async (config) => {
    const ideaPaths = await generateIdeasIds()
    return ideaPaths.map((id) => ({
      loc: `/ideas/${id}`,
      changefreq: 'weekly',
      priority: 0.7,
    }));
  },
}
