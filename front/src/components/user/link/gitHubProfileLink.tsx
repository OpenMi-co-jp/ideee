import { Anchor, ActionIcon } from '@mantine/core'
import { IconBrandGithub } from '@tabler/icons-react'
import { useHover } from '@mantine/hooks'
import { useUser } from '@/context/userProfileContext';


export default function GithubProfileLink() {
  const user = useUser();
  
  const { hovered, ref } = useHover()
  const githubId = user?.githubId

  return (
    <ActionIcon>
      <Anchor href={user.githubId ? 'https://github.com/${githubId}' : ''} target="_blank" rel="nopener noreferrer">
      <div ref={ref}>
        <IconBrandGithub
          color="black"
          style={
            hovered ? { transform: 'scale(1.2)', transition: 'all 0.05s' } : {}
          }
        />
      </div>
      </Anchor>
    </ActionIcon>
  )
}
