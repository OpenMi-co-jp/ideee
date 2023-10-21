import { useUser } from '@/context/userProfileContext';
import { Image, Anchor } from '@mantine/core';

export function UserIcon() {
    const user = useUser();
    const userIcon = user.icon || '/img/undefined_user_icon.webp';
    const userIconUrl = user.remoteUrl || '#';

    return(
        <Anchor href={userIconUrl} onClick={(e) => userIconUrl === '#' && e.preventDefault()}>
            <Image
                src={userIcon}
                alt="ユーザーアイコン"
            />
        </Anchor>
    )
}