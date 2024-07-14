import { Badge } from '@mantine/core'
import Link from 'next/link'

export type StanceBadgeProps = {
  stance: 'free_right' | 'personal_project' | 'team_project'
}

export const StanceBadge = ({ stance }: StanceBadgeProps) => {
  const stanceList = {
    free_right: {
      gradient: { from: 'teal', to: 'green' },
      text: 'アイデア権フリー',
    },
    personal_project: {
      gradient: { from: 'violet', to: 'gray' },
      text: '個人開発中',
    },
    team_project: {
      gradient: { from: 'violet', to: 'red' },
      text: 'チーム開発募集',
    },
  }

  if (!(stance in stanceList)) {
    return (
      <Badge radius="md" size="lg">
        定義なし
      </Badge>
    )
  }

  const { gradient, text } = stanceList[stance]

  return (
    <Link href={`/search?stance_eq=${stance}`}>
      <Badge variant="gradient" gradient={gradient} radius="md" size="lg">
        {text}
      </Badge>
    </Link>
  )
}
