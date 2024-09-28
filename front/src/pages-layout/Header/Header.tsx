import { useMantineColorScheme, Box, Group, Portal, rem } from '@mantine/core'
import { useHeadroom } from '@mantine/hooks'
import {
  UserToggle,
  LatestNotifications,
  ServiceIcon,
  SearchIcon,
  Sidebar,
} from './headerComponents'
import { IdeaCreateButton } from '@/components/idea/createButton'
import { CreateSpButton } from '@/components/idea/createSpButton'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { useBreakPoint } from '@/utils/hooks/useBreakPoint'
import { CampaignBox } from './headerComponents/CampaignBox'

export const Header = () => {
  const pinned = useHeadroom({ fixedAt: 120 })
  const { colorScheme } = useMantineColorScheme()
  const { isMobile } = useBreakPoint()
  const { currentUser } = useCurrentUser()

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
          <Group justify="center" align="center">
            <SearchIcon />
            {currentUser && <LatestNotifications />}
            <UserToggle />
            {currentUser && !isMobile && <IdeaCreateButton />}
            {currentUser && isMobile && <CreateSpButton />}
            {isMobile && <Sidebar />}
          </Group>
        </Group>
      </Box>
      <CampaignBox pinned={pinned} />
    </Portal>
  )
}
