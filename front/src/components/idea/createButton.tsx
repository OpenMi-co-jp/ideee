import { Button } from '@mantine/core'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { useMediaQuery } from '@mantine/hooks'

export const IdeaCreateButton = () => {
  const { currentUser } = useCurrentUser()
  const isMobile = useMediaQuery('(max-width: 450px)')

  if (currentUser && !isMobile) {
    return (
      <Button variant="gradient" gradient={{ from: 'yellow', to: 'orange' }}>
        アイデア投稿
      </Button>
    )
  } else {
    return <></>
  }
}
