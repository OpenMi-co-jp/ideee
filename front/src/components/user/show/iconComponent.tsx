import { Image } from '@mantine/core'
import { useUser } from '@/context/userProfileContext'

export const IconComponent = () => {
  const user = useUser()
  const icon = user?.icon

  return (
    <Image
      src={icon ? icon : '/img/undefined_user_icon.webp'}
      alt="ユーザーアイコン"
      w="13%"
      h="13%"
      miw="6rem"
      mx="2rem"
      my="2rem"
    />
  )
}
