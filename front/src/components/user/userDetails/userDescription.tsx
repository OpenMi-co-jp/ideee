import { useUser } from '@/context/userProfileContext';
import { Text } from '@mantine/core';

export function UserDescription() {
    const user = useUser();
    const userDescription = user.description;

    return(
        <Text>自己紹介{userDescription}</Text>
    )
}