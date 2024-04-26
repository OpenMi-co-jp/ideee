import { Divider } from '@mantine/core'
import {
  IconBulb,
  IconUserPlus,
  IconLogout2,
  IconLogin2,
  IconUserCircle,
  IconUserEdit,
  IconSettings,
} from '@tabler/icons-react'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { useSignOut } from '@/components/Auth/SignOut/hooks'
import { MenuList } from './MenuList'
import { NavItem } from './NavItem'

type NavListProps = {
  close: () => void
}

export const NavList = ({ close }: NavListProps) => {
  const { currentUser } = useCurrentUser()
  const handleSignOut = useSignOut()

  return (
    <>
      {currentUser && (
        <>
          <NavItem
            item={{
              label: 'アイデア投稿',
              href: '/ideas/new',
              icon: IconBulb,
            }}
            closeDrawer={close}
          />

          <Divider my="xs" label="User" labelPosition="left" color="orange" />

          <NavItem
            item={{
              label: 'マイページ',
              href: `/users/${currentUser?.id}`,
              icon: IconUserCircle,
            }}
            closeDrawer={close}
          />
          <NavItem
            item={{
              label: 'ユーザー情報編集',
              href: '/mypage/edit',
              icon: IconUserEdit,
            }}
            closeDrawer={close}
          />
          <NavItem
            item={{
              label: 'Settings',
              href: '/settings',
              icon: IconSettings,
            }}
            closeDrawer={close}
          />
        </>
      )}

      {!currentUser && (
        <>
          <Divider my="xs" label="Login" labelPosition="left" color="orange" />

          <NavItem
            item={{
              label: 'ログイン',
              href: '/users/sign_in',
              icon: IconLogin2,
            }}
            closeDrawer={close}
          />
          <NavItem
            item={{
              label: '新規登録',
              href: '/users/sign_up',
              icon: IconUserPlus,
            }}
            closeDrawer={close}
          />
        </>
      )}

      <Divider my="xs" label="Contents" labelPosition="left" color="orange" />

      <MenuList close={close} />
      {currentUser && (
        <>
          <Divider my="xs" label="Logout" labelPosition="left" color="orange" />

          <NavItem
            item={{
              label: 'ログアウト',
              // FIXME: hrefはrequiredになっているので仕方なく設定していますが、実質は不要です。hrefの指定がなくなれば、onClickのpreventDefaultもいらなくなります。
              href: '#',
              icon: IconLogout2,
              onClick: (e) => {
                e.preventDefault()
                handleSignOut()
              },
            }}
            closeDrawer={close}
          />
        </>
      )}
    </>
  )
}
