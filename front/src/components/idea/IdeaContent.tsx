import React from 'react'
import { useRouter } from 'next/router'
import { Group, Loader, Paper, Text } from '@mantine/core'
import { useGetIdeaQuery } from '@/lib/generated/client'
import { FormatDate } from '@/utils/common'
export const IdeaContent = () => {
  const router = useRouter()
  const { data, loading, error } = useGetIdeaQuery({
    variables: {
      id: router.query.id as string,
    },
  })

  if (loading) return <Loader color="yellow" />

  const createdAt = data?.idea.createdAt ? new Date(data.idea.createdAt) : null;

  return (
    <>
      <Paper bg="#A5A5A52E" radius="md" p="xl">
        <Text size="lg">背景</Text>
        <Text pb="lg" pl='lg'>{data?.idea.background}</Text>
        <Text size="lg">ゴール</Text>
        <Text pb="lg" pl='lg'>{data?.idea.goal}</Text>
        <Text size="lg">イシュー</Text>
        <Text pb="lg" pl='lg'>{data?.idea.issue}</Text>
        <Text size="lg">メイン機能</Text>
        <Text pb="lg" pl='lg'>{data?.idea.wishFunction}</Text>
        <Text size="lg">仮説(数値的)</Text>
        <Text pb="lg" pl='lg'>{data?.idea.hypothesis}</Text>
        <Text size="lg">ターゲット(ペルソナ)</Text>
        <Text pb="lg" pl='lg'>{data?.idea.target}</Text>
        <Text size="lg">マネタイズ方法</Text>
        <Text pb="lg" pl='lg'>{data?.idea.monetize}</Text>
        <Text size="lg">類似サービス</Text>
        <Text pb="lg" pl='lg'>{data?.idea.similar}</Text>
        <Text size="lg">補足</Text>
        <Text pb="lg" pl='lg'>{data?.idea.note}</Text>
      </Paper>
      <Group py="lg" mr="lg" position="right">
        <Text size="md">{FormatDate(createdAt)}</Text>
      </Group>
    </>
  )
}
