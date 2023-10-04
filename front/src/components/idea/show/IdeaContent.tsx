import React from 'react'
import { useRouter } from 'next/router'
import { Group, Loader, Paper, Text } from '@mantine/core'
import { useGetIdeaQuery } from '@/lib/generated/client'
import { FormatDate } from '@/utils/common'
import { IdeaSection } from './IdeaSection'
export const IdeaContent = () => {
  const router = useRouter()
  const { data, loading, error } = useGetIdeaQuery({
    variables: {
      id: router.query.id as string,
    },
  })

  if (loading) return <Loader color="yellow" />

  const createdAt = data?.idea.createdAt ? new Date(data.idea.createdAt) : null
  const sections = [
    { title: '背景', content: data?.idea.background },
    { title: 'ゴール', content: data?.idea.goal },
    { title: 'イシュー', content: data?.idea.issue },
    { title: 'メイン機能', content: data?.idea.wishFunction },
    { title: '仮説(数値的)', content: data?.idea.hypothesis },
    { title: 'ターゲット(ペルソナ)', content: data?.idea.target },
    { title: 'マネタイズ方法', content: data?.idea.monetize },
    { title: '類似サービス', content: data?.idea.similar },
    { title: '補足', content: data?.idea.note },
  ]

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
      </Paper>
      <Group py="lg" mr="lg" position="right">
        <Text size="md">{FormatDate(createdAt)}</Text>
      </Group>
    </>
  )
}
