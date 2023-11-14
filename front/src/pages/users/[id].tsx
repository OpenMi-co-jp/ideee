import UserDescription from '@/components/user/show/description'
import UserIconComponent from '@/components/user/show/iconComponent'
import UserDetailComponentIndex from '@/components/user/userDetailComponentIndex'
import { Box, Divider, Group } from '@mantine/core'
import { useRouter } from 'next/router'
import { useGetUserQuery } from '@/lib/generated/client'
import { UserProvider } from '@/context/userProfileContext'
import { LoaderBox } from '@/components/features/LoaderBox'
import { AlertError } from '@/components/alert/error'

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
      <Box w="100%" miw="15rem" p="lg" bg="" style={{ borderRadius: '0.5rem' }}>
        <Group>
          <UserIconComponent />
          <UserDetailComponentIndex />
        </Group>
        <UserDescription />
        <Divider />
      </Box>
    </UserProvider>
  )
}
