import { Button } from '@mantine/core'
import { useCurrentUser } from '@/context/CurrentUserContext'

export const IdeaCreateButton = () => {
  const { currentUser } = useCurrentUser()

  if (currentUser) {
    return (
      <Button variant="gradient" gradient={{ from: 'yellow', to: 'orange' }}>
        アイデア投稿
      </Button>
    )
  } else {
    return <></>
  }
}
