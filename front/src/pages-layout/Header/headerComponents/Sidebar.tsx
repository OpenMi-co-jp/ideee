import { useDisclosure } from '@mantine/hooks'
import { Drawer, Button, Space, Divider, NavLink, Anchor } from '@mantine/core'
import {
  IconMenu2,
  IconLogin2,
  IconUserPlus,
  IconLogout2,
  IconChevronRight,
  IconBulb,
} from '@tabler/icons-react'
import { useMediaQuery } from '@mantine/hooks'
import Link from 'next/link'
import { CurrentUserProps, useCurrentUser } from '@/context/CurrentUserContext'
import { HandleSignOut } from '@/components/Auth/SignOut/hooks'
import { MenuList } from './Sidebar/MenuList'

export const Sidebar = ({
  currentUser,
}: {
  currentUser: CurrentUserProps | null
}) => {
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
            <MenuList close={close} />
          </Drawer>
          <Button onClick={open} variant="outline" color="orange">
            <IconMenu2 />
          </Button>
        </>
      )}
    </>
  )
}
