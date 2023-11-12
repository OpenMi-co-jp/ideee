import { useUser } from '@/context/userProfileContext'
import { Anchor, ActionIcon } from '@mantine/core'
import { IconLink } from '@tabler/icons-react'
import { useHover } from '@mantine/hooks'

export default function OtherLink() {
    const user = useUser()
    const { hovered, ref } = useHover()
    const siteUrl = user?.siteUrl
    return(
        <Anchor href={siteUrl ? siteUrl : ""}>
        <ActionIcon>
            <div ref={ref}>
                <IconLink
                color='black'
                style={ hovered ? { transform: 'scale(1,2', transition: 'all 0.5s'} : {}}/>
            </div>
        </ActionIcon>
        </Anchor>
    )
}