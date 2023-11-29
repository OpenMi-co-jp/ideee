import { useDisclosure } from '@mantine/hooks'
import { Drawer, Button, Space, Divider, NavLink } from '@mantine/core'
import { 
  IconMenu2, 
  IconLogin2,
  IconUserPlus,
  IconLogout2,
  IconChevronRight
 } from '@tabler/icons-react'
import { useMediaQuery } from '@mantine/hooks'
import Link from 'next/link'
import { useLoggedIn } from '@/components/loginContext'
import { handleSignOut } from '@/components/Auth/SignOut/hooks'

export const Sidebar = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const isMobile = useMediaQuery('(max-width: 47.99em)')
  const { setLoggedIn } = useLoggedIn()
  const onSubmit = () => handleSignOut(setLoggedIn)

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
            {/* Drawer content */}
            <Divider my="xs" label="Login" labelPosition="left" color='orange'/>
            
            <Link href="/user/sign_in">
            <NavLink
              px="2rem"
              h="4rem"
              label="ログイン"
              color="black"
              leftSection={<IconLogin2 size="1.3rem" stroke={2.5} />}
              rightSection={<IconChevronRight size="0.8rem" stroke={1.5} color="black"/>}
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
              rightSection={<IconChevronRight size="0.8rem" stroke={1.5} color="black"/>}
              variant="subtle"
              active
            />
            </Link>
            <Space />
            <Link href="/user/sign_in">
            <NavLink
              px="2rem"
              h="4rem"
              label="ログアウト"
              color="black"
              leftSection={<IconLogout2 size="1.3rem" stroke={2.5} color="black"/>}
              rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
              variant="subtle"
              active
              onClick={onSubmit}
            />
            </Link>
            
          </Drawer>
          <Button onClick={open} variant="outline" color="orange">
            <IconMenu2 />
          </Button>
        </>
      )}
    </>
  )
}



