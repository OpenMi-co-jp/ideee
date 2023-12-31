import { useRouter } from 'next/router'
import { useGetUserQuery } from '@/lib/generated/client'
import { UserProvider } from '@/context/userProfileContext'
import { LoaderBox } from '@/components/features/LoaderBox'
import { AlertError } from '@/components/alert/error'
import { Profile } from '@/components/user/show'

export default function UserProfile() {
  const router = useRouter()
  const { id } = router.query
  const { data, loading, error } = useGetUserQuery({
    variables: {
      id: id as string,
    },
  })
  if (loading) return <LoaderBox />
  if (error) return <AlertError />

  return (
    <UserProvider user={data?.user}>
      <Profile />
    </UserProvider>
  )
}
