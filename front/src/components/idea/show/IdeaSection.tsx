import React from 'react'
import { Text } from '@mantine/core'

export const IdeaSection = ({
  title,
  content,
}: {
  title: string
  content: string | null | undefined
}) => {
  if (!content) return null

  return (
    <>
      <Text size="lg">{title}</Text>
      <Text pb="lg" pl="lg">
        {content}
      </Text>
    </>
  )
}
