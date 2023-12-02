import { Anchor, ActionIcon, Group } from '@mantine/core'
import {
  IconBrandGithub,
  IconBrandTwitter,
  IconLink,
} from '@tabler/icons-react'
import { useHover } from '@mantine/hooks'
import { useUser } from '@/context/userProfileContext'

const GithubLink = () => {
  const user = useUser()
  const { hovered, ref } = useHover()

  return (
    <ActionIcon variant="transparent">
      <Anchor
        href={user?.githubId ? `https://github.com/${user.githubId}` : ''}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div ref={ref}>
          <IconBrandGithub
            color="black"
            style={
              hovered
                ? { transform: 'scale(1.1)', transition: 'all 0.03s' }
                : {}
            }
          />
        </div>
      </Anchor>
    </ActionIcon>
  )
}

const TwitterLink = () => {
  const user = useUser()
  const { hovered, ref } = useHover()
  return (
    <ActionIcon variant="transparent">
      <Anchor
        href={user?.twitterId ? `https://twitter.com/${user.twitterId}` : ''}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div ref={ref}>
          <IconBrandTwitter
            color="black"
            style={
              hovered
                ? { transform: 'scale(1.1)', transition: 'all 0.03s' }
                : {}
            }
          />
        </div>
      </Anchor>
    </ActionIcon>
  )
}

const SiteUrl = () => {
  const user = useUser()
  const { hovered, ref } = useHover()
  return (
    <ActionIcon variant="transparent">
      <Anchor
        href={user?.siteUrl ? `${user.siteUrl}` : ''}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div ref={ref}>
          <IconLink
            color="black"
            style={
              hovered
                ? { transform: 'scale(1.1)', transition: 'all 0.03s' }
                : {}
            }
          />
        </div>
      </Anchor>
    </ActionIcon>
  )
}

export const LinkComponent = () => {
  return (
    <Group mx="0.5rem">
      <GithubLink />
      <TwitterLink />
      <SiteUrl />
    </Group>
  )
}
