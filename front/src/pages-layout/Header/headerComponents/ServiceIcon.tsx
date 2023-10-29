import { Image } from '@mantine/core'
import Link from 'next/link'
import { useMediaQuery } from '@mantine/hooks'
export const ServiceIcon = () => {
  const isMobile = useMediaQuery(`(max-width: 550px)`)
  return (
    <Link href="/">
      <Image
        src={isMobile ? '/img/mobile_version_icon.png' : '/img/IdeeeLogo.webp'}
        alt="ideeeのロゴ"
        height={40}
      />
    </Link>
  )
}
