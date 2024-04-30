import { NavLink } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'
import Link from 'next/link'
import type { TablerIconsProps } from '@tabler/icons-react'

type NavItemProps = {
  item: {
    label: string
    href: string
    icon: (props: TablerIconsProps) => React.ReactElement
    onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  }
  closeDrawer: () => void
}

export const NavItem = ({ item, closeDrawer }: NavItemProps) => {
  const { label, href, icon: Icon, onClick } = item
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (onClick) {
      onClick(event)
    }
    closeDrawer()
  }

  return (
    <Link href={href} passHref>
      <NavLink
        px="2rem"
        h="4rem"
        label={label}
        leftSection={<Icon size="1.3rem" stroke={2.5} />}
        rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
        variant="subtle"
        onClick={handleClick}
      />
    </Link>
  )
}
