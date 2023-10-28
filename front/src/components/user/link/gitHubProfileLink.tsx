//import { useUser } from '@/context/userProfileContext';
import { Anchor, ActionIcon } from '@mantine/core';
import { IconBrandGithub  } from '@tabler/icons-react'
import { useHover } from '@mantine/hooks'


export default function GithubProfileLink() {
    //const user = useUser();
    //const githubId = user.githubId;
    //<Anchor href={githubId ? 'https://github.com/${githubId}' : ''} target="_blank" rel="nopener noreferrer"></Anchor>

    const { hovered, ref } = useHover();
    return (
            <ActionIcon>
                <div ref={ref}>
                <IconBrandGithub color="black" style={hovered ? { transform: "scale(1.2)", transition: "all 0.05s" } : {}}/>
                </div>
            </ActionIcon>
    )
}