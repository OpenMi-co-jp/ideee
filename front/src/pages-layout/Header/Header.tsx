import { useMantineColorScheme, Box, Group, Portal, rem } from '@mantine/core'
import type { FC } from 'react'
import { useHeadroom, useMediaQuery } from '@mantine/hooks'
import { SearchIcon } from './headerComponents'
import { UserToggle, Notification, ServiceIcon } from './headerComponents'
import { IdeaCreateButton } from '@/components/idea/createButton'
import { Sidebar } from './headerComponents/Sidebar'
import { useLoggedIn } from '@/components/loginContext'

export const Header: FC = () => {
  const pinned = useHeadroom({ fixedAt: 120 })
  const { colorScheme } = useMantineColorScheme()
  const { setLoggedIn } = useLoggedIn()
  const { loggedIn } = useLoggedIn()
  const isNarrowScreen = useMediaQuery('(max-width: 388px)')
  const headerHeight = isNarrowScreen ? rem(115) : rem(60)

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
          height: headerHeight,
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
            { loggedIn &&
            <Notification />}
            <UserToggle />
            <IdeaCreateButton />
            <Sidebar />
          </Group>
        </Group>
      </Box>
    </Portal>
  )
}
