import { useUser } from '@/context/userProfileContext';
import { Text, Anchor } from '@mantine/core';

function GithubProfileLink() {
    const user = useUser();

    const githubId = user.githubId;

    if(!githubId) {
        return <Text></Text>
    }


    const githubUrl = 'https://github.com/${githubId}';

    return (
        <Anchor
            aria-label="GitHub"
            href={githubUrl}
            target="_blank"
            rel="nopener noreferrer"
        >
            https://github.com/${githubId}
        </Anchor>
    )
}