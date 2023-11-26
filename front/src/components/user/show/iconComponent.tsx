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
        borderRadius: '50%',
      }}
      ml={isMobile ? '-4.5%' : ''}
      mb="lg"
      w="16%"
      h="16%"
      miw="6rem"
    >
      <Image
        src={icon ? icon : '/img/undefined_user_icon.webp'}
        alt="ユーザーアイコン"
      />
    </Card>
  )
}
