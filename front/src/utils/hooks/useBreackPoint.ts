import { useMediaQuery } from '@mantine/hooks'

/**
 * モバイルデバイスかどうか、または狭いスクリーンのモバイルデバイスかどうかを判断するカスタムフック
 * @returns {Object} isMobileとisNarrowScreenMobileの2つの値を持つオブジェクトを返す
 */
export const useBreakPoint = (): { isMobile: boolean, isNarrowScreenMobile: boolean } => {
  const isMobile = useMediaQuery(`(max-width: 565px)`)
  const isNarrowScreenMobile = useMediaQuery(`(max-width: 381px)`)


  return { isMobile: !!isMobile, isNarrowScreenMobile: !!isNarrowScreenMobile }
}