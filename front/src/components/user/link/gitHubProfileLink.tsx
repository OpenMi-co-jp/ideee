import { useUser } from '@/context/userProfileContext'
import { Anchor, ActionIcon } from '@mantine/core'
import { IconBrandGithub } from '@tabler/icons-react'
import { useHover } from '@mantine/hooks'

export default function GithubProfileLink() {
    const user = useUser()
    const { hovered, ref } = useHover()
    const githubId = user?.githubId;
    
    return(
        <Anchor href={githubId ? 'https://twitter.com/${githubId}' : ""}>
            <ActionIcon>
                <div ref={ref}>
                    <IconBrandGithub 
                    color='black'
                    style={
                        hovered ? { transform: 'scale(1,2)', transition: 'all 0.5s' } : {}}
                    />
                </div>
            </ActionIcon>
        </Anchor>
    )
}