import UserDescription from '@/components/user/show/description'
import UserIconComponent from '@/components/user/show/iconComponent'
import UserDetailComponentIndex from '@/components/user/userDetailComponentIndex'
import { Box, Divider, Group, Loader } from '@mantine/core'
import { useState, useEffect } from 'react'
import { useLoggedIn } from '@/components/loginContext'
import { useRouter } from 'next/router'
import { useGetUserDataQuery } from '@/lib/generated/client'
import { UserDataProvider } from '@/context/userProfileContext'
import { UserData } from '@/lib/generated/client'



export default function UserProfile() {
  const { loggedIn } = useLoggedIn()
  const [LSLoggedIn, setLSLoggedIn] = useState(false)
  const router = useRouter()
  const { id } = router.query
  const [user, setUser] = useState<UserData | undefined>()


  const testUserData = {
    id: 'test_user_id',
    icon: '@/img/undefined_user_icon.webp',
    name: 'Test User',
    githubId: '/naru20181117/ideee',
    twitterId: '/ideee_tech',
    siteUrl: 'https://www.ideee.tech',
    description: 'This is a test user',
  }

  const provider =
      <UserDataProvider user={testUserData}>
      <Box w="100%" miw="15rem" p="lg" bg="" style={{ borderRadius: '0.5rem' }}>
        <Group>
          <UserIconComponent />
          <UserDetailComponentIndex />
        </Group>
        <UserDescription />
        <Divider />
      </Box>
    </UserDataProvider>
  
return provider
}
