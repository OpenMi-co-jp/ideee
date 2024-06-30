import { Badge, Tooltip } from '@mantine/core'
import Link from 'next/link'

export type DifficultyBadgeProps = {
  difficulty: 'easy' | 'middle' | 'hard'
}

export const DifficultyBadge = ({ difficulty }: DifficultyBadgeProps) => {
  const difficultyList = {
    easy: {
      color: 'blue',
      text: 'かんたん',
      tooltip: '開発の難易度は初心者向けです',
    },
    middle: {
      color: 'orange',
      text: 'ふつう',
      tooltip: '開発の難易度は中級者向けです',
    },
    hard: {
      color: 'red',
      text: 'むずかしい',
      tooltip: '開発の難易度は上級者向けです',
    },
  }

  if (!(difficulty in difficultyList)) {
    return null
  }

  const { color, text, tooltip } = difficultyList[difficulty]

  return (
    <Link href={`/search?difficulty_eq=${difficulty}`}>
      <Tooltip label={tooltip} color="gray">
        <Badge variant="outline" color={color} radius="sm" size="lg">
          LEVEL: {text}
        </Badge>
      </Tooltip>
    </Link>
  )
}
