/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_FRONT_URL || 'https://ideee.tech',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  exclude: ['/mypage/*', '/ideas/new', '/user/*'],
  // 動的ルーティングの設定
  additionalPaths: async (config) => {
    const ideaPaths = await fetchIdeaPaths();
    return ideaPaths.map((id) => ({
      loc: `/ideas/${id}`,
      changefreq: 'weekly',
      priority: 0.7,
      }));
    },
}

// 動的ルーティングのパスを取得する関数
async function fetchIdeaPaths() {
  // ここでAPIやデータベースから動的パスを取得します
  // 例: const res = await fetch('https://api.example.com/ideas');
  // const ideas = await res.json();
  // return ideas.map((idea) => idea.id);
  return ['1', '2', '3']; // 仮のデータ
}
