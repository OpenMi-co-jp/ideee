import { Anchor, Menu, MenuDropdown, NavLink } from '@mantine/core'
import { menuData } from './MenuData'
import { IconChevronDown, IconChevronRight, IconChevronUp } from '@tabler/icons-react'
import Link from 'next/link'
import { useState } from 'react'

type MenuListProps = {
  close: () => void
}

export const MenuList = ({ close }: MenuListProps) => {
  const [isOpen, setIsOpen] = useState<Record<string, boolean>>({})

  return (
    <>
      {menuData.map((menu, index) => (
        <Menu key={index} width={290} shadow="lg">
          <Menu.Target>
            <NavLink
              px="2rem"
              h="4rem"
              label={menu.label}
              color="black"
              rightSection={
                isOpen[menu.label] ? <IconChevronUp size="0.8rem" stroke={1.5} color="black" /> : <IconChevronDown size="0.8rem" stroke={1.5} color="black" />
              }
              leftSection={menu.icon}
              variant="subtle"
              onClick={() => setIsOpen(prevState => ({ ...prevState, [menu.label]: !prevState[menu.label] }))}
            />
          </Menu.Target>
          <MenuDropdown>
            {menu.links.map((link, linkIndex) => (
              <Link key={linkIndex} href={link.href}>
                <Anchor underline="never" >
                  <Menu.Item
                    style={{ width: '280px', height: '60px' }}
                    rightSection={
                      <IconChevronRight
                        size="0.8rem"
                        stroke={1.5}
                        color="black"
                      />
                    }
                    onClick={close}
                  >
                    {link.text}
                  </Menu.Item>
                </Anchor>
              </Link>
            ))}
          </MenuDropdown>
        </Menu>
      ))}
    </>
  )
}
