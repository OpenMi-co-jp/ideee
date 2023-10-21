import { useUser } from '@/context/userProfileContext';
import { Text } from '@mantine/core';

export function UserEmail() {
    const user = useUser();
    const userEmail = user.email;

    return(
        <Text>ユーザー名{userEmail}</Text>
    )
}