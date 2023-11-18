import { Anchor, ActionIcon, Group } from '@mantine/core'
import {
  IconBrandGithub,
  IconBrandTwitter,
  IconLink,
} from '@tabler/icons-react'
import { useHover } from '@mantine/hooks'
import { useUser } from '@/context/userProfileContext'

export default function LinkComponent() {
  const LinkTypes = {
    TWITTER: 'twitterId',
    GITHUB: 'githubId',
    SITEURL: 'siteUrl',
  }

  const user = useUser()

  const renderLink = (type: string) => {
    const { hovered, ref } = useHover()
    switch (type) {
      case LinkTypes.GITHUB:
        return (
          <ActionIcon variant="subtle" color="transparent" mr="-0.3rem">
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
                      ? { transform: 'scale(1.2)', transition: 'all 0.05s' }
                      : {}
                  }
                />
              </div>
            </Anchor>
          </ActionIcon>
        )

      case LinkTypes.TWITTER:
        return (
          <ActionIcon variant="subtle" color="transparent" mr="-0.3rem">
            <Anchor
              href={
                user?.twitterId ? `https://twitter.com/${user.twitterId}` : ''
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <div ref={ref}>
                <IconBrandTwitter
                  color="black"
                  style={
                    hovered
                      ? { transform: 'scale(1.2)', transition: 'all 0.05s' }
                      : {}
                  }
                />
              </div>
            </Anchor>
          </ActionIcon>
        )

      case LinkTypes.SITEURL:
        return (
          <ActionIcon variant="subtle" color="transparent">
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
                      ? { transform: 'scale(1.2)', transition: 'all 0.05s' }
                      : {}
                  }
                />
              </div>
            </Anchor>
          </ActionIcon>
        )
      default:
        return null
    }
  }
  return (
    <Group ml="-6px">
      {renderLink(LinkTypes.GITHUB)}
      {renderLink(LinkTypes.TWITTER)}
      {renderLink(LinkTypes.SITEURL)}
    </Group>
  )
}
