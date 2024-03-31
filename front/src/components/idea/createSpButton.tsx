import { Button } from '@mantine/core'
import { IconPencil } from '@tabler/icons-react'
import Link from 'next/link'

export const CreateSpButton = () => {
  return (
    <Link href="/ideas/new">
      <Button variant="gradient" gradient={{ from: 'yellow', to: 'orange' }}>
        <IconPencil size={25} />
      </Button>
    </Link>
  )
}
