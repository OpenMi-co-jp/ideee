import { useUser } from '@/context/userProfileContext';
import { Anchor, ActionIcon } from '@mantine/core';
import { IconBrandTwitter,  } from '@tabler/icons-react'


export function TwitterProfileLink() {
    const user = useUser();
    const twitterId = user.twitterId;

    return (
        <Anchor
            href={twitterId ? 'https://twitter.com/${twitterId}' : ''}
            target="_blank"
            rel="nopener noreferrer"
        >
            <ActionIcon>
                <IconBrandTwitter/>
            </ActionIcon>
        </Anchor>
    )
}