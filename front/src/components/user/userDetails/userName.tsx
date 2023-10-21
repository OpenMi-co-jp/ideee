import { useUser } from '@/context/userProfileContext';
import { Text } from '@mantine/core';

export function UserName() {
    const user = useUser();
    const userName = user.name;

    return(
        <Text>ユーザー名{userName}</Text>
    )
}