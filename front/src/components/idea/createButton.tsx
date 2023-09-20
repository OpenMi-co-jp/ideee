import { Button } from '@mantine/core'
import { useLoggedIn } from '@/components/loginContext'

export const IdeaCreateButton = () => {
  const { loggedIn } = useLoggedIn()
  const LSLoggedIn = localStorage.getItem('loggedIn') == 'true'

  if (LSLoggedIn || loggedIn) {
    return (
      <Button variant="gradient" gradient={{ from: 'yellow', to: 'orange' }}>
        アイデア投稿
      </Button>
    )
  } else {
    return <></>
  }
}
