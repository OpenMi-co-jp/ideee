import { useDisclosure } from '@mantine/hooks'
import { Drawer, Button } from '@mantine/core'
import { IconMenu2 } from '@tabler/icons-react'
import { NavList } from './NavList'

export const Sidebar = () => {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Drawer
        size="xs"
        position="right"
        opened={opened}
        onClose={close}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <NavList close={close} />
      </Drawer>
      <Button onClick={open} variant="outline" color="orange">
        <IconMenu2 />
      </Button>
    </>
  )
}
