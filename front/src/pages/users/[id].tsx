import { UserProvider } from '@/context/userProfileContext'
import { LoaderBox } from '@/components/features/LoaderBox'
import { AlertError } from '@/components/alert/error'
import { Profile } from '@/components/user/show'
import { Divider, Container } from '@mantine/core'
import { useGetUser } from '@/utils/hooks/useGetUser'

export default function UserProfile() {
  const { data, loading, error } = useGetUser()
  if (loading) return <LoaderBox />
  if (error) return <AlertError />

  return (
    <UserProvider user={data?.user}>
      <Container>
        <Profile />
        <Divider />
        {/* TODO: アイデアのリストなどを表示 */}
      </Container>
    </UserProvider>
  )
}

