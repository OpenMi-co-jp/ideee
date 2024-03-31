import { IconBook, IconSun } from '@tabler/icons-react'
import * as constant from '@/utils/constant'

export const menuData = [
  {
    label: 'About',
    icon: <IconSun size="1.3rem" stroke={2.5} />,
    links: [
      {
        href: constant.ABOUT_URL,
        title: constant.ABOUT_TEXT,
        isExternal: false,
      },
      {
        href: constant.FIND_IDEA_URL,
        title: constant.FIND_IDEA_TEXT,
        isExternal: false,
      },
      {
        href: constant.TREND_URL,
        title: constant.TREND_TEXT,
        isExternal: true,
      },
      {
        href: constant.AVOID_PITFALL_URL,
        title: constant.AVOID_PITFALL_TEXT,
        isExternal: false,
      },
    ],
  },
  {
    label: 'Legal',
    icon: <IconBook size="1.3rem" stroke={2.5} />,
    links: [
      { href: constant.FAQ_URL, title: constant.FAQ_TEXT, isExternal: false },
      { href: constant.TOS_URL, title: constant.TOS_TEXT, isExternal: false },
      {
        href: constant.PRIVACY_POLICY_URL,
        title: constant.PRIVACY_POLICY_TEXT,
        isExternal: false,
      },
      { href: constant.NARU_URL, title: constant.NARU_TEXT, isExternal: true },
    ],
  },
]
