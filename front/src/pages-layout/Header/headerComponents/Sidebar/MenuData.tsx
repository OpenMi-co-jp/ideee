import { IconBook, IconSun } from '@tabler/icons-react'

export const menuData = [
  {
    label: 'About',
    icon: <IconSun size="1.3rem" stroke={2.5} />,
    links: [
      { href: '/about', title: 'ideeeについて' },
      {
        href: '/src/pages/how_to_find_idea',
        title: 'アイデアの探し方',
      },
      {
        href: 'https://qiita.com/naruqiita/items/0ef4b963434226eacb6b',
        title: '月間トレンドまとめ',
      },
      { href: '/avoid_pitfall', title: '個人顔発の落とし穴' },
    ],
  },
  {
    label: 'Legal',
    icon: <IconBook size="1.3rem" stroke={2.5} />,
    links: [
      { href: '/frequent_questions', title: 'よくある質問' },
      { href: '/terms_of_service', title: '利用規約' },
      { href: '/privacy_policy', title: 'プライバシーポリシー' },
      { href: 'https://naruhiro-portfolio.firebaseapp.com', title: '運営者' },
    ],
  },
]
