import { useDisclosure } from '@mantine/hooks'
import { Drawer, Button, Divider } from '@mantine/core'
import { IconMenu2 } from '@tabler/icons-react'
import { useMediaQuery } from '@mantine/hooks'
import { NavList } from './Sidebar/NavList'
import { MenuList } from './Sidebar/MenuList'

export const Sidebar = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const isMobile = useMediaQuery('(max-width: 47.99em)')

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
            <NavList close={close} />
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
