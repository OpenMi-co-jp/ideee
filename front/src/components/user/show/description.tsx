import { Text } from '@mantine/core'
import { useUser } from '@/context/userProfileContext'

export default function UserDescription() {
    const user = useUser()
    return(
        <><Text p='sm'>{user?.description}</Text></>
    )
}