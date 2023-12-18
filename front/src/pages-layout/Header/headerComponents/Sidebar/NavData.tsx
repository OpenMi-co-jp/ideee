import {
  IconBulb,
  IconLogin2,
  IconLogout2,
  IconUserPlus,
} from '@tabler/icons-react'
import { useCurrentUser, CurrentUserProps } from '@/context/CurrentUserContext'

const currentUser = useCurrentUser()
export const navData = [
  {
    label: 'アイデア投稿',
    href: '/',
    icon: IconBulb,
    onClick: close,
  },
  {
    label: 'ログアウト',
    href: '/logout',
    icon: IconLogout2,
    onClick: onsubmit,
    condition: (currentUser: CurrentUserProps | null) => !!currentUser,
  },
  {
    label: 'ログイン',
    href: '/users/sign_in',
    icon: IconLogin2,
    onClick: close,
    condition: (currentUser: CurrentUserProps | null) => !currentUser,
  },
  {
    label: '新規登録',
    href: '/users/sign_up',
    icon: IconUserPlus,
    onClick: close,
    condition: (currentUser: CurrentUserProps | null) => !currentUser,
  },
]
