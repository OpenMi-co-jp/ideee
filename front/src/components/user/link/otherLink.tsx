import { Anchor, ActionIcon } from '@mantine/core'
import { IconLink } from '@tabler/icons-react'
import { useHover } from '@mantine/hooks'
import { useUser } from '@/context/userProfileContext';


export default function OtherLink() {
  const user = useUser();
  <Anchor href={user.siteUrl ? 'https://twitter.com/${siteUrl}' : ''} target="_blank" rel="nopener noreferrer"></Anchor>

  const { hovered, ref } = useHover()
  const siteUrl = user?.siteUrl
  return (
    <ActionIcon>
      <Anchor
        href={siteUrl ? `https://twitter.com/${siteUrl}` : ''}
        target="_blank"
        rel="nopener noreferrer"
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
}
