import { UserProvider } from '@/context/userProfileContext'
import { LoaderBox } from '@/components/features/LoaderBox'
import { AlertError } from '@/components/alert/error'
import { UserEditForm } from '@/components/user/edit/UserEditForm'
import { useGetUserQuery } from '@/lib/generated/client'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { useRouter } from 'next/router'
import { showError } from '@/components/showNotification'
import { useEffect } from 'react'

export default function UserEdit() {
  const { currentUser } = useCurrentUser()
  const { data, loading, error } = useGetUserQuery({
    variables: {
      id: String(currentUser?.id),
    },
  })
  const router = useRouter()
  useEffect(() => {
    if (!currentUser) {
      showError({ action: 'ユーザーの編集', message: 'ログインしてください' })
      router.push('/')
      return
    }
  }, [currentUser, router])

  if (loading) return <LoaderBox />
  if (error) return <AlertError />

  return (
    <UserProvider user={data?.user}>
      <UserEditForm />
    </UserProvider>
  )
}
