import { useDisclosure } from '@mantine/hooks'
import { Drawer, Button, Divider } from '@mantine/core'
import {
  IconMenu2,
} from '@tabler/icons-react'
import { useMediaQuery } from '@mantine/hooks'
import { CurrentUserProps, useCurrentUser } from '@/context/CurrentUserContext'
import { HandleSignOut } from '@/components/Auth/SignOut/hooks'
import { NavList } from './Sidebar/NavList'
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
            <NavList />
            <Divider my="xs" label="Contents" labelPosition="left" color="orange" />
            <MenuList  />
          </Drawer>
          <Button onClick={open} variant="outline" color="orange">
            <IconMenu2 />
          </Button>
        </>
      )}
    </>
  )
}
