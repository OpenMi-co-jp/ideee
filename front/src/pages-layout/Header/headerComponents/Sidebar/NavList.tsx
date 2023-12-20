import { Anchor, NavLink, Divider } from '@mantine/core'
import { IconBulb, IconChevronRight, IconLogin2, IconLogout2, IconUserPlus } from '@tabler/icons-react'
import Link from 'next/link'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { HandleSignOut } from '@/components/Auth/SignOut/hooks'
import  React, { useState } from 'react'

type NavItemProps = {
  item: {
    label: string
    href?: string
    icon: any
  }
  closeDrawer: () => void
}

const NavItem = ({ item }: NavItemProps) => {
  const { label, href, icon: Icon } = item
  const { currentUser, setCurrentUser } = useCurrentUser()
  const handleSignOut = () => HandleSignOut(setCurrentUser)
  const handleClick = () => {
    if (label === 'ログアウト') {
      handleSignOut()
    }
    closeDrawer()
  }

  return (
  <Link href={href || '/'}>
    <Anchor underline="never" onClick={handleClick}>
      <NavLink
        px="2rem"
        h="4rem"
        label={label}
        color="black"
        leftSection={<Icon size="1.3rem" stroke={2.5} />}
        rightSection={<IconChevronRight size="0.8rem" stroke={1.5} color="black" />}
        variant="subtle"
        active
      />
    </Anchor>
  </Link>
  )
  }

export const NavList = () => {
  const { currentUser } = useCurrentUser()
  const [isDrawerOpen, setDrawerOpen] = useState(true)
  const closeDrawer = () => {
    setDrawerOpen(false)
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
        closeDrawer={closeDrawer}
      />
      {currentUser ? (
      <>
      <Divider my="xs" label="Logout" labelPosition="left" color="orange" />
      <NavItem
        item={{
        label: 'ログアウト',
        href: '/',
        icon: IconLogout2
      }}
      closeDrawer={closeDrawer}
      />
      </>
      ) : (
      <>
      <Divider my="xs" label="Login" labelPosition="left" color="orange" />
      <NavItem
      item={{
        label: 'ログイン',
        href: '/users/sign_in',
        icon: IconLogin2
      }}
      closeDrawer={closeDrawer}
      />
      <NavItem
        item={{
        label: '新規登録',
        href: '/users/sign_up',
        icon: IconUserPlus
      }}
      closeDrawer={closeDrawer}
      />
      </>
      )}
    </>
  )
}

function closeDrawer() {
  throw new Error('Function not implemented.')
}
