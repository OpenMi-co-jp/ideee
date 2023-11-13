import { Anchor, ActionIcon } from '@mantine/core'
import { IconBrandTwitter } from '@tabler/icons-react'
import { useHover } from '@mantine/hooks'
import { useUser } from '@/context/userProfileContext'

export default function TwitterProfileLink() {
  const user = useUser()

  const { hovered, ref } = useHover()

  return (
    <ActionIcon>
      <Anchor
        href={user.twitterId ? 'https://twitter.com/${twitterId}' : ''}
        target="_blank"
        rel="nopener noreferrer"
      >
        <div ref={ref}>
          <IconBrandTwitter
            color="black"
            style={
              hovered
                ? { transform: 'scale(1.2)', transition: 'all 0.0.5s' }
                : {}
            }
          />
        </div>
      </Anchor>
    </ActionIcon>
  )
}
