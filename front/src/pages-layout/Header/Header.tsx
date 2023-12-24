import { useMantineColorScheme, Box, Group, Portal, rem } from '@mantine/core'
import type { FC } from 'react'
import { useHeadroom } from '@mantine/hooks'
import { SearchIcon } from './headerComponents'
import { UserToggle, Notification, ServiceIcon } from './headerComponents'
import { IdeaCreateButton } from '@/components/idea/createButton'
import { Sidebar } from './headerComponents/Sidebar'

export const Header: FC = () => {
  const pinned = useHeadroom({ fixedAt: 120 })
  const { colorScheme } = useMantineColorScheme()
  
  return (
    <Portal>
      <Box
        px="lg"
        py="sm"
        style={(theme) => ({
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200, // modalのindexがが201のため
          transform: `translate3d(0, ${pinned ? 0 : rem(-110)}, 0)`,
          transition: 'transform 400ms ease',
          borderBottom: `1px solid ${theme.colors.gray[2]}`,
          backgroundColor: colorScheme === 'dark' ? theme.black : theme.white,
          color: colorScheme === 'dark' ? theme.white : theme.black,
        })}
      >
        <Group justify="space-between">
          <ServiceIcon />
          <Group justify="center">
            <SearchIcon />
            <Notification />
            <UserToggle />
            <IdeaCreateButton />
            <Sidebar />
          </Group>
        </Group>
      </Box>
    </Portal>
  )
}
