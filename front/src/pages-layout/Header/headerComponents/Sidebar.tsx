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

export const Sidebar = ({ currentUser }: {currentUser: CurrentUserProps | null}) => {
  const [opened, { open, close }] = useDisclosure(false)
  const isMobile = useMediaQuery('(max-width: 47.99em)')
  const { setCurrentUser } = useCurrentUser()
  const onSubmit = () => HandleSignOut(setCurrentUser)

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
            
            { !currentUser && (
              <>
                <Divider
                  my="xs"
                      label="Login"
                      labelPosition="left"
                      color="orange"
                    />
                    <Link href="/user/sign_in">
                      <Anchor underline="never">
                        <NavLink
                          px="2rem"
                          h="4rem"
                          label="ログイン"
                          color="black"
                          leftSection={
                            <IconLogin2 size="1.3rem" stroke={2.5} />
                          }
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
                    <Link href="/user/sign_up">
                      <Anchor underline="never">
                        <NavLink
                          px="2rem"
                          h="4rem"
                          label="新規登録"
                          color="black"
                          leftSection={
                            <IconUserPlus size="1.3rem" stroke={2.5} />
                          }
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
                  )} else {(
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
                          <IconLogout2
                            size="1.3rem"
                            stroke={2.5}
                            color="black"
                          />
                        }
                        rightSection={
                          <IconChevronRight size="0.8rem" stroke={1.5} />
                        }
                        variant="subtle"
                        active
                      
                      />
                    </Anchor>
                  </>
                  )}
            <Divider
              my="xs"
              label="Contents"
              labelPosition="left"
              color="orange"
            />
            <Menu width={290} shadow="lg">
              <Menu.Target>
                <NavLink
                  px="2rem"
                  h="4rem"
                  label="About"
                  color="black"
                  leftSection={<IconSun size="1.3rem" stroke={2.5} />}
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
                <Link href="/about">
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
                      ideeeについて
                    </Menu.Item>
                  </Anchor>
                </Link>

                <Link href="https://www.ideee.tech/how_to_find_idea">
                  <Anchor underline="never">
                    <Menu.Item
                      w={280}
                      h={60}
                      rightSection={
                        <IconChevronRight
                          size="0.8rem"
                          stroke={1.5}
                          color="black"
                          onClick={close}
                        />
                      }
                      type="button"
                    >
                      アイデアの探し方
                    </Menu.Item>
                  </Anchor>
                </Link>

                <Link href="https://qiita.com/naruqiita/items/0ef4b963434226eacb6b">
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
                      type="button"
                    >
                      月間トレンドまとめ
                    </Menu.Item>
                  </Anchor>
                </Link>

                <Link href="/avoid_pitfall">
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
                      type="button"
                      onClick={close}
                    >
                      個人顔発の落とし穴
                    </Menu.Item>
                  </Anchor>
                </Link>
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
                <Link href="/frequent_questions">
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
                      type="button"
                      onClick={close}
                    >
                      よくある質問
                    </Menu.Item>
                  </Anchor>
                </Link>

                <Link href="/terms_of_service">
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
                      type="button"
                      onClick={close}
                    >
                      利用規約
                    </Menu.Item>
                  </Anchor>
                </Link>

                <Link href="/privacy_policy">
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
                      type="button"
                      onClick={close}
                    >
                      プライバシーポリシー
                    </Menu.Item>
                  </Anchor>
                </Link>

                <Link href="https://naruhiro-portfolio.firebaseapp.com">
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
                      type="button"
                    >
                      運営者
                    </Menu.Item>
                  </Anchor>
                </Link>
              </MenuDropdown>
            </Menu>
          </Drawer>
          <Button onClick={open} variant="outline" color="orange">
            <IconMenu2 />
          </Button>
        </>
      )}
    </>
  )
}
