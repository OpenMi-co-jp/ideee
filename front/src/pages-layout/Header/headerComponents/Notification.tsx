import { IconBell } from '@tabler/icons-react'
import Link from 'next/link'

export const Notification = () => {
  return (
    <Link href="/notifications" passHref>
      <IconBell size={25} />
    </Link>
  )
}
