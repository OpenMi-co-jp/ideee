import UserDescription from '@/components/user/show/description'
import UserIconComponent from '@/components/user/show/iconComponent'
import  UserDetailDataIndex from '@/components/user/userDetailComponentIndex'
import { Box, Divider, Group, rem, Loader } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useState, useEffect } from 'react'
import { useLoggedIn } from '@/components/loginContext'
import { useRouter } from 'next/router'
import { GetUserQuery } from '@/lib/generated/client'
import { useGetUserQuery } from '@/lib/generated/client'

export default function UserProfile() {
    const isMobile = useMediaQuery(`(max-width: ${rem(300)})`)
    const { loggedIn } = useLoggedIn()
    const [LSLoggedIn, setLSLoggedIn] = useState(false)
    const router = useRouter()
    const { id } = router.query
    const { data, loading, error } = useGetUserQuery({
        variables: {
            id: id as string
        }
    })

    const [user, setUser] = useState({})

    useEffect(() => {
        setLSLoggedIn(localStorage.getItem('loggedIn') === 'true')

        if (data) {
            setUser(data?.user)
        }
    }, [data])

    if (loading) return <Loader color="yellow" />

    
    return (
//UserProviderを定義↓


        <Box w="100%" miw="15rem" p="lg" bg="" style={{borderRadius: "0.5rem"}} >
            <Group>
            <UserIconComponent/>
            <UserDetailDataIndex/>
            </Group>
            <UserDescription/>
            <Divider/>
        </Box>
    
    
    
    )
}