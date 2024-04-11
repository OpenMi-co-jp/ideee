import { Image } from '@mantine/core'
import NextImage from 'next/image'
import Link from 'next/link'
import { useBreakPoint } from '@/utils/hooks/useBreakPoint'
export const ServiceIcon = () => {
  const { isMobile } = useBreakPoint()
  return (
    <Link href="/">
      <Image
        component={NextImage}
        src={isMobile ? '/img/mobile_version_icon.png' : '/img/IdeeeLogo.webp'}
        alt="ideeeのロゴ"
        height={40}
        width={isMobile ? 40 : 120}
        fit="contain"
      />
    </Link>
  )
}
