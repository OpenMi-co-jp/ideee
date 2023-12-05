import { Image, Card, rem } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useUser } from '@/context/userProfileContext'

export const IconComponent = () => {
  const isMobile = useMediaQuery(`(max-width: ${rem(450)})`)
  const user = useUser()
  const icon = user?.icon

  return (
    <Card
      style={{
        display: 'flex',
        justifyContent: isMobile ? '' : 'flex-start',
      }}
      ml={isMobile ? '-4.5%' : ''}
      w="16%"
      h="16%"
      miw="6rem"
    >
      <Image
        src={icon ? icon : process.env.NEXT_PUBLIC_DEFAULT_USER_ICON_PATH}
        alt="ユーザーアイコン"
        radius="50%"
      />
    </Card>
  )
}
