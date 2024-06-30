import { Paper, Flex } from '@mantine/core'
import { IdeaContentSet } from './IdeaContentSet'
import { useIdea } from '@/context/IdeaContext'
import { StanceBadge, StanceBadgeProps } from '@/utils/StanceBadge'
import Link from 'next/link'
import { DifficultyBadge, DifficultyBadgeProps } from '@/utils/DifficultyBadge'

export const MinIdeaContents = () => {
  const idea = useIdea()
  const { stance, difficulty } = idea
  const sections = [
    { label: '背景', content: idea?.background },
    { label: 'ゴール', content: idea?.goal },
  ]

  return (
    <Paper bg="#FCFCFC" radius="md" px="xl" py="md">
      <Flex direction="column" gap="xs">
        <StanceBadge stance={stance as StanceBadgeProps['stance']} />
        <DifficultyBadge
          difficulty={difficulty as DifficultyBadgeProps['difficulty']}
        />
      </Flex>

      {sections.map((section, index) => (
        <IdeaContentSet key={index} {...section} />
      ))}
    </Paper>
  )
}
