import { IconBook, IconSun } from '@tabler/icons-react'

export const menuData = [
  {
    label: 'About',
    icon: <IconSun size="1.3rem" stroke={2.5} />,
    links: [
      { href: '/about', text: 'ideeeについて' },
      {
        // TODO:
        // https://github.com/naru20181117/ideee/pull/1220でページ実装後に、ここのリンクを修正する
        href: 'https://www.ideee.tech/how_to_find_idea',
        text: 'アイデアの探し方',
      },
      {
        href: 'https://qiita.com/naruqiita/items/0ef4b963434226eacb6b',
        text: '月間トレンドまとめ',
      },
      { href: '/avoid_pitfall', text: '個人顔発の落とし穴' },
    ],
  },
  {
    label: 'Legal',
    icon: <IconBook size="1.3rem" stroke={2.5} />,
    links: [
      { href: '/frequent_questions', text: 'よくある質問' },
      { href: '/terms_of_service', text: '利用規約' },
      { href: '/privacy_policy', text: 'プライバシーポリシー' },
      { href: 'https://naruhiro-portfolio.firebaseapp.com', text: '運営者' },
    ],
  },
]
