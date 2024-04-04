import * as constant from '@/utils/constant'

export const footerData = {
  data: [
    {
      title: 'About',
      links: [
        {
          label: constant.ABOUT_TEXT,
          link: constant.ABOUT_URL,
          isExternal: false,
        },
        {
          label: constant.FIND_IDEA_TEXT,
          link: constant.FIND_IDEA_URL,
          isExternal: false,
        },
        {
          label: constant.TREND_TEXT,
          link: constant.TREND_URL,
          isExternal: true,
        },
        {
          label: constant.AVOID_PITFALL_TEXT,
          link: constant.AVOID_PITFALL_URL,
          isExternal: false,
        },
      ],
    },
    {
      title: 'Legal',
      links: [
        {
          label: constant.FAQ_TEXT,
          link: constant.FAQ_URL,
          isExternal: false,
        },
        { label: constant.TOS_TEXT, link: constant.TOS_URL, isExternal: false },
        {
          label: constant.PRIVACY_POLICY_TEXT,
          link: constant.PRIVACY_POLICY_URL,
          isExternal: false,
        },
        {
          label: constant.NARU_TEXT,
          link: constant.NARU_URL,
          isExternal: true,
        },
      ],
    },
  ],
}
