import { Image } from '@mantine/core'
import Link from 'next/link'
import { useBreackPoint } from '@/utils/hooks/useBreackPoint'
export const ServiceIcon = () => {
  const { isMobile } = useBreackPoint()
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
