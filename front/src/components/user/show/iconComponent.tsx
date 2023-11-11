import { Image, Card, rem } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useState, useEffect } from 'react'


export default function UserIconComponent() {
  const isMobile = useMediaQuery(`(max-width: ${rem(450)})`)
  const [useIcon, setUserIcon] = useState("");


  useEffect(() => {
    const iconUrl = "";
    setUserIcon(iconUrl);
  }, []);

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
      <Image src={useIcon || "/img/undefined_user_icon.webp"} alt="ユーザーアイコン" />
    </Card>
  )
}
