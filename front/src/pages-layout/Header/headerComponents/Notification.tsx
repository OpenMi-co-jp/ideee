import { IconBell } from '@tabler/icons-react'
import Link from 'next/link'
import { useCurrentUser } from '@/context/CurrentUserContext'

export const Notification = () => {
  const currentUser = useCurrentUser()

  return (
    <>
      {currentUser && (
        <Link href="/notifications" passHref>
          <IconBell size={25} />
        </Link>
      )}
    </>
  )
}
