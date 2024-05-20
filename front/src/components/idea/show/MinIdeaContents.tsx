import { Paper } from '@mantine/core'
import { IdeaContentSet } from './IdeaContentSet'
import { useIdea } from '@/context/IdeaContext'
import { StanceBadge } from '@/utils/StanceBadge'
import Link from 'next/link'
import type { StanceBadgeProps } from '@/utils/StanceBadge'

export const MinIdeaContents = () => {
  const idea = useIdea()
  const { stance } = idea
  const sections = [
    { label: '背景', content: idea?.background },
    { label: 'ゴール', content: idea?.goal },
  ]

  return (
    <Paper bg="#FCFCFC" radius="md" px="xl" py="md">
      <Link href={`/search?stance_eq=${stance}`}>
        <StanceBadge stance={stance as StanceBadgeProps['stance']} />
      </Link>
      {sections.map((section, index) => (
        <IdeaContentSet key={index} {...section} />
      ))}
    </Paper>
  )
}
