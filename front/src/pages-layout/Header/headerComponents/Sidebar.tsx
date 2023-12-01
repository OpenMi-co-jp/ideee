import { useDisclosure } from '@mantine/hooks'
import {
  Drawer,
  Button,
  Space,
  Divider,
  NavLink,
  Menu,
  MenuTarget,
  MenuDropdown,
} from '@mantine/core'
import {
  IconMenu2,
  IconLogin2,
  IconUserPlus,
  IconLogout2,
  IconChevronRight,
  IconSun,
  IconBook,
} from '@tabler/icons-react'
import { useMediaQuery } from '@mantine/hooks'
import Link from 'next/link'
import { useLoggedIn } from '@/components/loginContext'
import { handleSignOut } from '@/components/Auth/SignOut/hooks'
import { useState } from 'react'

export const Sidebar = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const isMobile = useMediaQuery('(max-width: 47.99em)')
  const { setLoggedIn } = useLoggedIn()
  const { loggedIn } = useLoggedIn()
  const onSubmit = () => handleSignOut(setLoggedIn)

  return (
    <>
      <Drawer
        size="xs"
        position="right"
        opened={opened}
        onClose={close}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <Divider my="xs" label="Contents" labelPosition="left" color="orange" />
        <Menu width={290} shadow="lg">
          <Menu.Target>
            <NavLink
              px="2rem"
              h="4rem"
              label="About"
              color="black"
              leftSection={<IconSun size="1.3rem" stroke={2.5} />}
              rightSection={
                <IconChevronRight size="0.8rem" stroke={1.5} color="black" />
              }
              variant="subtle"
              active
            />
          </Menu.Target>
          <MenuDropdown>
            <Menu.Item
              w={280}
              h={60}
              rightSection={
                <IconChevronRight size="0.8rem" stroke={1.5} color="black" />
              }
            >
              ideeeについて
            </Menu.Item>
            <Menu.Item
              w={280}
              h={60}
              rightSection={
                <IconChevronRight size="0.8rem" stroke={1.5} color="black" />
              }
            >
              アイデアの探し方
            </Menu.Item>
            <Menu.Item
              w={280}
              h={60}
              rightSection={
                <IconChevronRight size="0.8rem" stroke={1.5} color="black" />
              }
            >
              月間トレンドまとめ
            </Menu.Item>
            <Menu.Item
              w={280}
              h={60}
              rightSection={
                <IconChevronRight size="0.8rem" stroke={1.5} color="black" />
              }
            >
              個人顔発の落とし穴
            </Menu.Item>
          </MenuDropdown>
        </Menu>

        <Menu width={290} shadow="lg">
          <Menu.Target>
            <NavLink
              px="2rem"
              h="4rem"
              label="Legal"
              color="black"
              leftSection={<IconBook size="1.3rem" stroke={2.5} />}
              rightSection={
                <IconChevronRight size="0.8rem" stroke={1.5} color="black" />
              }
              variant="subtle"
              active
            />
          </Menu.Target>
          <MenuDropdown>
            <Menu.Item
              w={280}
              h={60}
              rightSection={
                <IconChevronRight size="0.8rem" stroke={1.5} color="black" />
              }
            >
              よくある質問
            </Menu.Item>
            <Menu.Item
              w={280}
              h={60}
              rightSection={
                <IconChevronRight size="0.8rem" stroke={1.5} color="black" />
              }
            >
              利用規約
            </Menu.Item>
            <Menu.Item
              w={280}
              h={60}
              rightSection={
                <IconChevronRight size="0.8rem" stroke={1.5} color="black" />
              }
            >
              プライバシーポリシー
            </Menu.Item>
            <Menu.Item
              w={280}
              h={60}
              rightSection={
                <IconChevronRight size="0.8rem" stroke={1.5} color="black" />
              }
            >
              運営者
            </Menu.Item>
          </MenuDropdown>
        </Menu>

        {(() => {
          if (loggedIn) {
            return (
              <>
                <Divider
                  my="xs"
                  label="Login"
                  labelPosition="left"
                  color="orange"
                />
                <Link href="/user/sign_in">
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
                  />
                </Link>
                <Space />
                <Link href="/user/sign_up">
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
                  />
                </Link>
              </>
            )
          } else {
            return (
              <>
                <Divider
                  my="xs"
                  label="Logout"
                  labelPosition="left"
                  color="orange"
                />
                <NavLink
                  px="2rem"
                  h="4rem"
                  label="ログアウト"
                  color="black"
                  leftSection={
                    <IconLogout2 size="1.3rem" stroke={2.5} color="black" />
                  }
                  rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
                  variant="subtle"
                  active
                  onClick={onSubmit}
                />
              </>
            )
          }
        })()}
      </Drawer>
      <Button onClick={open} variant="outline" color="orange">
        <IconMenu2 />
      </Button>
    </>
  )
}
