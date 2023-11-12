import UserDescription from '@/components/user/show/description'
import UserIconComponent from '@/components/user/show/icon'
import UserDetailComponentIndex from '@/components/user/userDetailComponentIndex'
import { Box, Divider, Group } from '@mantine/core'
import { useRouter } from 'next/router'
import { useGetUserQuery } from '@/lib/generated/client'
import { UserProvider, useUser } from '@/context/userProfileContext'
import { LoaderBox } from '@/components/features/LoaderBox'
import { AlertError } from '@/components/alert/error'





export default function UserProfile() {
  const router = useRouter()
  const { id } = router.query


  
  const { data, loading, error } = useGetUserQuery({
    skip: !id || Array.isArray(id),
    variables: {
      id: id as string,
    },
  })
  if (loading) return <LoaderBox />
  if (error) return <AlertError />


  function UserProfileContent() {
    const user = useUser()
    return(
      <Box w="100%" miw="15rem" p="lg" bg="" style={{ borderRadius: '0.5rem' }}>
        <Group>
          <UserIconComponent />
          <UserDetailComponentIndex />
        </Group>
        <UserDescription />
        <Divider />
      </Box>
      )
  }

  return(
    <UserProvider user={data?.user}>
      <UserProfileContent />
    </UserProvider>
  )
}
