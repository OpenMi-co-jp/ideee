import { Badge } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import Link from 'next/link'

type TagProps = {
  tagName: string
  size?: string
  isTruncated?: boolean
}

export const Tag = ({ tagName, size, isTruncated = false }: TagProps) => {
  const isSmallScreen = useMediaQuery('(max-width: 992px)')
  const truncatedStyle = isTruncated
    ? {
        width: 'fix-content',
        maxWidth: isSmallScreen ? '86px' : '110px',
      }
    : {}

  return (
    <Link href={`/search?name_or_idea_tags_name_cont=${tagName}`}>
      <Badge
        c="gray"
        size={size || 'lg'}
        radius="lg"
        variant="gradient"
        gradient={{ from: '#f7eac0', to: '#ebcaca' }}
        style={{ textTransform: 'none', ...truncatedStyle }}
      >
        {tagName}
      </Badge>
    </Link>
  )
}
