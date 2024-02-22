import { Button } from '@mantine/core'
import Link from 'next/link'

export const IdeaCreateButton = () => {
  return (
    <Link href="/ideas/new">
      <Button variant="gradient" gradient={{ from: 'yellow', to: 'orange' }}>
        アイデア投稿
      </Button>
    </Link>
  )
}
