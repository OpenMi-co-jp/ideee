import { Anchor, Menu, MenuDropdown, NavLink } from '@mantine/core'
import { menuData } from './MenuData'
import { IconChevronRight } from '@tabler/icons-react'
import Link from 'next/link'

type CloseProps = {
  close: any
}

export const MenuList = ({ close }: CloseProps) => {
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
              leftSection={menu.icon}
              rightSection={
                <IconChevronRight size="0.8rem" stroke={1.5} color="black" />
              }
              variant="subtle"
              active
            />
          </Menu.Target>
          <MenuDropdown>
            {menu.links.map((link, linkIndex) => (
              <Link key={linkIndex} href={link.href}>
                <Anchor underline="never">
                  <Menu.Item
                    w={280}
                    h={60}
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
