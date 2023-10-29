import { Badge } from '@mantine/core'
import Link from 'next/link'

type TagProps = {
  tagName: string
}

export const Tag = ({ tagName }: TagProps) => {
  return (
    <Link href={`/search?name_or_idea_tags_name_cont=${tagName}`}>
      <Badge
        c="gray"
        size="lg"
        radius="lg"
        m="xs"
        variant="gradient"
        gradient={{ from: '#f7eac0', to: '#ebcaca' }}
      >
        # {tagName}
      </Badge>
    </Link>
  )
}
