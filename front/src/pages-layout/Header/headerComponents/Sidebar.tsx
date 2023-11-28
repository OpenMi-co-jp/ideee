import { useDisclosure } from '@mantine/hooks'
import { Drawer, Button, Box } from '@mantine/core'
import { IconMenu2 } from '@tabler/icons-react'
import { useMediaQuery } from '@mantine/hooks'

export const Sidebar = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const isMobile = useMediaQuery('(max-width: 47.99em)')

  return (
    <>
    {isMobile && (
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
      </>)}
    </>
  )
}
