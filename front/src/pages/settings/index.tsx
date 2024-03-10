import { UserSettingsForm } from '@/components/user/setting/UserSettingsForm'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Settings() {
  const { currentUser } = useCurrentUser()
  const router = useRouter()
  useEffect(() => {
    if (!currentUser) {
      router.push('/')
    }
  }, [currentUser, router])

  return <UserSettingsForm />
}
