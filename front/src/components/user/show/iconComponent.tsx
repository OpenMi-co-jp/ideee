import { Image, Card, rem, Flex, Center, px } from '@mantine/core'
import { useUser } from '@/context/userProfileContext'
import { useMediaQuery } from '@mantine/hooks'

export const IconComponent = () => {
  const user = useUser()
  const icon = user?.icon
  
  

  return (
      <Image
        src={icon ? icon : '/img/undefined_user_icon.webp'}
        alt="ユーザーアイコン"
        my="xs"
        w="13%"
        h="13%"
        miw="6rem"
        style={{
          borderRadius: '50%',
        }}
      />
      
    
    
  )
}
