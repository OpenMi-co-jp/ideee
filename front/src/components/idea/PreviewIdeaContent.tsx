import React from 'react'
import { useRouter } from 'next/router'
import { Group, Loader, Paper, Text } from '@mantine/core'
import { useGetIdeaQuery } from '@/lib/generated/client'
import { FormatDate } from '@/utils/common'
import { IdeaSection } from './IdeaSection'
export const PreviewIdeaContent = () => {
  const router = useRouter()
  const { data, loading, error } = useGetIdeaQuery({
    variables: {
      id: router.query.id as string,
    },
  })

  if (loading) return <Loader color="yellow" />

  const createdAt = data?.idea.createdAt ? new Date(data.idea.createdAt) : null
  const sections = [{ title: '背景', content: data?.idea.background }]

  return (
    <>
      <Paper bg="#A5A5A52E" radius="md" p="xl">
        {sections.map((section, index) => (
          <IdeaSection
            key={index}
            title={section.title}
            content={section.content}
          />
        ))}
        <Text size="lg">ゴール</Text>
      </Paper>
    </>
  )
}
