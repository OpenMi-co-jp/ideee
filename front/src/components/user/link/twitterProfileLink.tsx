//import { useUser } from '@/context/userProfileContext';
import { Anchor, ActionIcon } from '@mantine/core';
import { IconBrandTwitter,  } from '@tabler/icons-react'
import { useHover } from '@mantine/hooks';


export default function TwitterProfileLink() {
    //const user = useUser();
    //const twitterId = user.twitterId;
    //<Anchor href={twitterId ? 'https://twitter.com/${twitterId}' : ''} target="_blank" rel="nopener noreferrer"></Anchor>

    const { hovered, ref } = useHover();

    return (
        <ActionIcon>
            <div ref={ref}>
                <IconBrandTwitter color="black" style={hovered ? { transform: "scale(1.2)", transition: "all 0.0.5s" } : {}}/>
            </div>
        </ActionIcon>

    )
}