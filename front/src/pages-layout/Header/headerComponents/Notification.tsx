import { IconBell } from '@tabler/icons-react'
import Link from 'next/link'
import { CurrentUserProps, useCurrentUser } from '@/context/CurrentUserContext'

export const Notification = ({
  currentUser,
}: {
  currentUser: CurrentUserProps | null
}) => {
  const { setCurrentUser } = useCurrentUser()

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
