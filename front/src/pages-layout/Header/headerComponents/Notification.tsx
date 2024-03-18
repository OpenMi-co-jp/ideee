import { IconBell } from '@tabler/icons-react'
import Link from 'next/link'
import { showError } from '@/components/notifications'

export const Notification = () => {
  return (
    <Link href="#" onClick={() => showError({ message: '準備中の機能です' })}>
      <IconBell size={25} />
    </Link>
  )
}
