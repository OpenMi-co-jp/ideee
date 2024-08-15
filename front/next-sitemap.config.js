/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_FRONT_URL || 'https://ideee.tech',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  exclude: ['/mypage/*', '/ideas/new', '/user/*']
}
