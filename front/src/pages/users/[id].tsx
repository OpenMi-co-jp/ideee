import UserDescription from '@/components/user/show/description'
import UserIconComponent from '@/components/user/show/iconComponent'
import UserDetailComponentIndex from '@/components/user/userDetailComponentIndex'
import { Box, Divider, Group, rem } from '@mantine/core'
import { useRouter } from 'next/router'
import { useGetUserQuery } from '@/lib/generated/client'
import { UserProvider } from '@/context/userProfileContext'
import { useLoggedIn } from '@/components/loginContext'
import { useEffect, useState } from 'react'

export default function UserProfile() {
  const { loggedIn } = useLoggedIn()
  const [LSLoggedIn, setLSLoggedIn] = useState(false)

  useEffect(() => {
    try {
      setLSLoggedIn(localStorage.getItem('loggedIn') === 'true')
    } catch (e) {
      console.error(e)
    }
  }, [])

  const router = useRouter()
  const { id } = router.query
  const { data, loading, error } = useGetUserQuery({
    variables: {
      id: id as string,
    },
  })

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
