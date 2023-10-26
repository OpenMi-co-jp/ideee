import { Box, Center, Group, rem, Divider } from '@mantine/core'
import UserIconComponent from '@/components/user/userDetails/userIconComponent'
import UserDescription from '@/components/user/userDetails/userDescription'
import { UserDetailDataIndex } from '@/pages/userProfile/userDetailComponentIndex'
import { useMediaQuery } from '@mantine/hooks'

export default function UserProfile() {
    const isMobile = useMediaQuery(`(max-width: ${rem(300)})`)
    
    return (
        <>
        <Center>
        <Box w="80%" miw="15rem" p="lg" bg="" style={{borderRadius: "0.5rem"}} >
            <Group  >
            <UserIconComponent/>
            <UserDetailDataIndex/>
            </Group>
            <UserDescription/>
            <Divider/>
        </Box>
        </Center>
        </>
    )
}