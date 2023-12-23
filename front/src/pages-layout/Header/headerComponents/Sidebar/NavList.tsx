import { NavLink, Divider } from '@mantine/core'
import {
  IconBulb,
  IconChevronRight,
  IconLogin2,
  IconLogout2,
  IconUserPlus,
} from '@tabler/icons-react'
import Link from 'next/link'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { HandleSignOut } from '@/components/Auth/SignOut/hooks'

type NavItemProps = {
  item: {
    label: string
    href?: string
    icon: any
  }
  closeDrawer: () => void
  handleSignOut?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

type NavListProps = {
  close: () => void
}

const NavItem = ({ item, closeDrawer,handleSignOut = () => {}}: NavItemProps) => {
  const { label, href, icon: Icon } = item
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    handleSignOut(event);
    closeDrawer();
  }
  
  return (
    <Link href={ href || '/'} passHref >
        <NavLink
          px="2rem"
          h="4rem"
          label={label}
          color="black"
          leftSection={<Icon size="1.3rem" stroke={2.5} />}
          rightSection={
            <IconChevronRight size="0.8rem" stroke={1.5} color="black" />
          }
          variant="subtle"
          onClick={handleClick}
        />
    </Link>
  )
}

export const NavList = ({ close }: NavListProps) => {
  const { currentUser, setCurrentUser } = useCurrentUser()
  const handleSignOut = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    HandleSignOut(setCurrentUser)
    event.preventDefault()
  }
  
  return (
    <>
      <Divider my="xs" label="Idea" labelPosition="left" color="orange" />
      <NavItem
        item={{
          label: 'アイデア投稿',
          href: '/',
          icon: IconBulb,
        }}
        closeDrawer={close}
      />
      {currentUser ? (
        <>
          <Divider my="xs" label="Logout" labelPosition="left" color="orange" />
          <NavItem
            item={{
              label: 'ログアウト',
              href: '/',
              icon: IconLogout2,
            }}
            closeDrawer={close}
            handleSignOut={handleSignOut}
          />
        </>
      ) : (
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
    </>
  )
}
