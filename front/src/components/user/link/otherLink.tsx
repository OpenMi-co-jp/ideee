//import { useUser } from '@/context/userProfileContext';
import { Anchor, ActionIcon } from '@mantine/core'
import { IconLink } from '@tabler/icons-react'
import { useHover } from '@mantine/hooks'

export default function OtherLink() {
  //const user = useUser();
  //const siteUrl = user.siteUrl;
  //<Anchor href={siteUrl ? '${siteUrl}' : ''} target="_blank" rel="nopener noreferrer"></Anchor>

  const { hovered, ref } = useHover()

  return (
    <ActionIcon>
      <div ref={ref}>
        <IconLink
          color="black"
          style={
            hovered ? { transform: 'scale(1.2)', transition: 'all 0.05s' } : {}
          }
        />
      </div>
    </ActionIcon>
  )
}
