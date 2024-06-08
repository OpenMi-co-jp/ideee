import { Badge } from '@mantine/core'
import Link from 'next/link'

type TagProps = {
  tagName: string
  size?: string
}

export const HotTag = ({ tagName, size }: TagProps) => {
  return (
    <Link href={`/search?name_or_idea_tags_name_cont=${tagName}`}>
      <Badge
        c="gray"
        size={size || 'lg'}
        radius="lg"
        mr="xs"
        variant="gradient"
        gradient={{ from: '#f7eac0', to: '#ebcaca' }}
        style={{
          textTransform: 'none',
          width: 'fix-content',
          maxWidth: '80px',
        }}
      >
        {tagName}
      </Badge>
    </Link>
  )
}
