import { Anchor, NavLink } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'
import Link from 'next/link'
import { navData } from './NavData'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { useDisclosure } from '@mantine/hooks'

type NavItemProps = {
    item: {
      href: string
      label: string
      icon: any
      onClick: React.MouseEventHandler<SVGElement> | null
      condition: (user: any) => boolean
    },
    close: () => void
  };

  const NavItem = ({ item }: NavItemProps) => (
    <Link href={item.href}>
      <Anchor underline="never">
        <NavLink
          px="2rem"
          h="4rem"
          label={item.label}
          color="black"
          leftSection={<item.icon size="1.3rem" stroke={2.5} />}
          rightSection={
            <IconChevronRight
              size="0.8rem"
              stroke={1.5}
              color="black"
              onClick={close}
            />
          }
          variant="subtle"
          active
        />
      </Anchor>
    </Link>
  )

  export const NavList = () => {
    const { currentUser } = useCurrentUser()
    const [ ,{ close }] = useDisclosure()
    const handleClick: React.MouseEventHandler<SVGAElement> = (event) => {

    }
  
    return (
      <>
        {navData.map(
          (item) =>
            item.condition?.(currentUser) && (
              <NavItem item={{...item, onClick: handleClick}} key={item.label} close={close}/>
            )
        )}
      </>
    )
  }
  
