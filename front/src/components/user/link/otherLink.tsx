import { useUser } from '@/context/userProfileContext';
import { Anchor, ActionIcon } from '@mantine/core';
import { IconLink  } from '@tabler/icons-react'


export function OtherLink() {
    const user = useUser();
    const siteUrl = user.siteUrl;

    return (
        <Anchor
            href={siteUrl ? '${siteUrl}' : ''}
            target="_blank"
            rel="nopener noreferrer"
        >
            <ActionIcon>
                <IconLink/>
            </ActionIcon>
        </Anchor>
    )
}
