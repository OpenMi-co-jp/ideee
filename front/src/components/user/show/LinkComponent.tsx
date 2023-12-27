import { Anchor, ActionIcon, Group } from '@mantine/core'
import { IconBrandGithub, IconBrandX, IconLink } from '@tabler/icons-react'
import { useHover } from '@mantine/hooks'
import { useUser } from '@/context/userProfileContext'
import { cloneElement } from 'react'

type SocialLinkProps = {
  icon: JSX.Element
  url: string
  isDisabled: boolean
}

const SocialLink = ({ icon, url, isDisabled }: SocialLinkProps) => {
  const { hovered, ref } = useHover()

  if (isDisabled) {
    return <div style={{ opacity: 0.3 }}>{icon}</div>
  }

  return (
    <Anchor href={url} target="_blank" rel="noopener noreferrer">
      <div ref={ref}>
        <ActionIcon variant="transparent">
          {cloneElement(icon, {
            color: 'black',
            style: hovered
              ? { transform: 'scale(1.1)', transition: 'all 0.03s' }
              : {},
          })}
        </ActionIcon>
      </div>
    </Anchor>
  )
}

export const LinkComponent = () => {
  const user = useUser()

  const links = [
    {
      id: user?.twitterId,
      url: `https://x.com/${user?.twitterId}`,
      icon: <IconBrandX />,
    },
    { id: user?.siteUrl, url: user?.siteUrl as string, icon: <IconLink /> },
    {
      id: user?.githubId,
      url: `https://github.com/${user?.githubId}`,
      icon: <IconBrandGithub />,
    },
  ]

  return (
    <Group my="sm">
      {links.map(
        (link) =>
          link.id && (
            <SocialLink
              key={link.id}
              icon={link.icon}
              url={link.url}
              isDisabled={!link.id}
            />
          )
      )}
    </Group>
  )
}
