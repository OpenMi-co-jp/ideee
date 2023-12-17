import { useDisclosure } from '@mantine/hooks'
import {
  Drawer,
  Button,
  Space,
  Divider,
  NavLink,
  Menu,
  MenuDropdown,
  Anchor,
} from '@mantine/core'
import {
  IconMenu2,
  IconLogin2,
  IconUserPlus,
  IconLogout2,
  IconChevronRight,
  IconSun,
  IconBook,
  IconBulb,
} from '@tabler/icons-react'
import { useMediaQuery } from '@mantine/hooks'
import Link from 'next/link'
import { CurrentUserProps, useCurrentUser } from '@/context/CurrentUserContext'
import { HandleSignOut } from '@/components/Auth/SignOut/hooks'

export const Sidebar = ({
  currentUser,
}: {
  currentUser: CurrentUserProps | null
}) => {
  const [opened, { open, close }] = useDisclosure(false)
  const isMobile = useMediaQuery('(max-width: 47.99em)')
  const { setCurrentUser } = useCurrentUser()
  const onSubmit = () => HandleSignOut(setCurrentUser)

  const menuData = [
    {
      label: 'About',
      icon: <IconSun size="1.3rem" stroke={2.5} />,
      links: [
        { href: '/about', text: 'ideeeについて' },
        {
          href: 'https://www.ideee.tech/how_to_find_idea',
          text: 'アイデアの探し方',
        },
        {
          href: 'https://qiita.com/naruqiita/items/0ef4b963434226eacb6b',
          text: '月間トレンドまとめ',
        },
        { href: '/avoid_pitfall', text: '個人顔発の落とし穴' },
      ],
    },
    {
      label: 'Legal',
      icon: <IconBook size="1.3rem" stroke={2.5} />,
      links: [
        { href: '/frequent_questions', text: 'よくある質問' },
        { href: '/terms_of_service', text: '利用規約' },
        { href: '/privacy_policy', text: 'プライバシーポリシー' },
        { href: 'https://naruhiro-portfolio.firebaseapp.com', text: '運営者' },
      ],
    },
  ]

  return (
    <>
      {isMobile && (
        <>
          <Drawer
            size="xs"
            position="right"
            opened={opened}
            onClose={close}
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
          >
            <Divider my="xs" label="Idea" labelPosition="left" color="orange" />
            <Link href="/">
              <Anchor underline="never">
                <NavLink
                  px="2rem"
                  h="4rem"
                  label="アイデア投稿"
                  color="black"
                  leftSection={<IconBulb size="1.3rem" stroke={2.5} />}
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
            <Space />

            {currentUser ? (
              <>
                <Divider
                  my="xs"
                  label="Logout"
                  labelPosition="left"
                  color="orange"
                />
                <Anchor underline="never">
                  <NavLink
                    px="2rem"
                    h="4rem"
                    label="ログアウト"
                    color="black"
                    onClick={onSubmit}
                    leftSection={
                      <IconLogout2 size="1.3rem" stroke={2.5} color="black" />
                    }
                    rightSection={
                      <IconChevronRight size="0.8rem" stroke={1.5} />
                    }
                    variant="subtle"
                    active
                  />
                </Anchor>
              </>
            ) : (
              <>
                <Divider
                  my="xs"
                  label="Login"
                  labelPosition="left"
                  color="orange"
                />
                <Link href="/users/sign_in">
                  <Anchor underline="never">
                    <NavLink
                      px="2rem"
                      h="4rem"
                      label="ログイン"
                      color="black"
                      leftSection={<IconLogin2 size="1.3rem" stroke={2.5} />}
                      rightSection={
                        <IconChevronRight
                          size="0.8rem"
                          stroke={1.5}
                          color="black"
                        />
                      }
                      variant="subtle"
                      active
                      onClick={close}
                    />
                  </Anchor>
                </Link>
                <Space />
                <Link href="/users/sign_up">
                  <Anchor underline="never">
                    <NavLink
                      px="2rem"
                      h="4rem"
                      label="新規登録"
                      color="black"
                      leftSection={<IconUserPlus size="1.3rem" stroke={2.5} />}
                      rightSection={
                        <IconChevronRight
                          size="0.8rem"
                          stroke={1.5}
                          color="black"
                        />
                      }
                      variant="subtle"
                      active
                      onClick={close}
                    />
                  </Anchor>
                </Link>
              </>
            )}
            <Divider
              my="xs"
              label="Contents"
              labelPosition="left"
              color="orange"
            />

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
                      <IconChevronRight
                        size="0.8rem"
                        stroke={1.5}
                        color="black"
                      />
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
          </Drawer>
          <Button onClick={open} variant="outline" color="orange">
            <IconMenu2 />
          </Button>
        </>
      )}
    </>
  )
}
