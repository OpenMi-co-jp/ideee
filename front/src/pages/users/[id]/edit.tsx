import { UserProvider } from '@/context/userProfileContext'
import { LoaderBox } from '@/components/features/LoaderBox'
import { AlertError } from '@/components/alert/error'
import { UserEditForm } from '@/components/user/edit/UserEditForm'
import { useGetUser } from '@/utils/hooks/useGetUser'

export default function UserEdit() {
  const { data, loading, error } = useGetUser()
  if (loading) return <LoaderBox />
  if (error) return <AlertError />

  return (
    <UserProvider user={data?.user}>
      <UserEditForm />
    </UserProvider>
  )
}
