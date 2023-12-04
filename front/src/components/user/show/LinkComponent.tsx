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
  const isDisabled = !user?.githubId
  const githubUrl = isDisabled ? '#' : `https://github.com/${user.githubId}`


  return (
    <ActionIcon variant="transparent">
      <Anchor
        href={user?.githubId ? githubUrl : ''}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => { if (isDisabled) e.preventDefault(); }}
        style={isDisabled ? { pointerEvents: 'none', opacity: 0.5 } : {}}
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
  const isDisabled = !user?.twitterId
  const twitterUrl = isDisabled ? '#' : `https://twitter.com/${user.twitterId}`

  return (
    <ActionIcon variant="transparent">
      <Anchor
        href={user?.twitterId ? twitterUrl : ''}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => { if (isDisabled) e.preventDefault(); }}
        style={isDisabled ? { pointerEvents: 'none', opacity: 0.5 } : {}}
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
  const isDisabled = !user?.siteUrl
  const SiteUrl = isDisabled ? '#' : '${user.siteUrl}'

  return (
    <ActionIcon variant="transparent">
      <Anchor
        href={user?.siteUrl ? SiteUrl : ''}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => { if (isDisabled) e.preventDefault(); }}
        style={isDisabled ? { pointerEvents: 'none', opacity: 0.5 } : {}}
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
