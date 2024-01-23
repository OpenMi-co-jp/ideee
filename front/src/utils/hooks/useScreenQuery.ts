import { useMediaQuery } from '@mantine/hooks'

/**
 * モバイルデバイスかどうか、または狭いスクリーンのモバイルデバイスかどうかを判断するカスタムフック
 * @returns {Object} isMobileとisNarrowScreenMobileの2つの値を持つオブジェクトを返す
 */
export const useScreenQuery = () => {
  const isMobile = useMediaQuery(`(min-width: 565px)`)
  const isNarrowScreenMobile = useMediaQuery(`(min-width: 381px)`)

  return { isMobile, isNarrowScreenMobile }
}
