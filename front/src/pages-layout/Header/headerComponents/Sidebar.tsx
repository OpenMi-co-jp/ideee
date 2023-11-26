import { useDisclosure } from '@mantine/hooks'
import { Drawer, Button } from '@mantine/core'
import { IconMenu2 } from '@tabler/icons-react'

export const Sidebar = () => {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="Authentication"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        {/* Drawer content */}
      </Drawer>
      <Button onClick={open} variant="outline" color="orange">
        <IconMenu2 />
      </Button>
    </>
  )
}
