/** @type {import('next-sitemap').IConfig} */
const baseUrl = process.env.NEXT_PUBLIC_FRONT_URL || 'https://ideee.tech'
module.exports = {
  siteUrl: baseUrl,
  generateRobotsTxt: true,
  changefreq: 'weekly',
  exclude: [
    '/mypage/*',
    '/ideas/new',
    '/user/*',
    '/users/sign_in',
    '/users/sign_up',
    '/users/confirmation',
    '/users/confirm_resend',
    '/users/forgot_password',
    '/users/reset_password',
  ],
  robotsTxtOptions: {
    additionalSitemaps: [
      baseUrl + '/server-sitemap-index.xml',
    ],
  },
};
