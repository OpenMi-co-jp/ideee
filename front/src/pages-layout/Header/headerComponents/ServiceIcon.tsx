import { Image } from '@mantine/core'
import Link from 'next/link'
import { useScreenQuery } from '@/utils/hooks/useScreenQuery'
export const ServiceIcon = () => {
  const { isMobile } = useScreenQuery()
  return (
    <Link href="/">
      <Image
        src={!isMobile ? '/img/mobile_version_icon.png' : '/img/IdeeeLogo.webp'}
        alt="ideeeのロゴ"
        height={40}
      />
    </Link>
  )
}
