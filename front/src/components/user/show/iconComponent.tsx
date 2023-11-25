import { Image } from '@mantine/core'
import { useUser } from '@/context/userProfileContext'

export const IconComponent = () => {
  const user = useUser()
  const icon = user?.icon

  return (    
    <>
      <Image
        src={icon ? icon : '/img/undefined_user_icon.webp'}
        alt="ユーザーアイコン"
        my="lg"
        w="16%"
        h="16%"
        miw="6rem"
      />
    </>
  )
}
