import { useUser } from '@/context/userProfileContext'
import { Anchor, ActionIcon } from '@mantine/core'
import { useHover } from '@mantine/hooks'
import { IconBrandTwitter } from '@tabler/icons-react'

export default function TwitterProfileLink() {
  const user = useUser()
  const { hovered, ref } = useHover()
  const twitterId = user?.twitterId
  return (
    <Anchor href={twitterId ? `https://twitter.com/${twitterId}` : ''}>
      <ActionIcon>
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
      </ActionIcon>
    </Anchor>
  )
}
