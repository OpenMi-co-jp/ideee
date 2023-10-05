import { useRouter } from 'next/router'
import { Group, Loader, Paper, Text } from '@mantine/core'
import { useGetIdeaQuery } from '@/lib/generated/client'
import { FormatDate } from '@/utils/common'
import { IdeaContentSet } from './IdeaContentSet'
import { IdeaManage } from '@/components/idea/manage'
import type { Idea } from '@/lib/generated/client'

const getSections = (idea?: Idea) => [
  { label: '背景', content: idea?.background },
  { label: 'ゴール', content: idea?.goal },
  { label: 'イシュー', content: idea?.issue },
  { label: 'メイン機能', content: idea?.wishFunction },
  { label: '仮説(数値的)', content: idea?.hypothesis },
  { label: 'ターゲット(ペルソナ)', content: idea?.target },
  { label: 'マネタイズ方法', content: idea?.monetize },
  { label: '類似サービス', content: idea?.similar },
  { label: '補足', content: idea?.note },
]

export const IdeaContents = () => {
  const router = useRouter()
  const { data, loading } = useGetIdeaQuery({
    variables: {
      id: router.query.id as string,
    },
  })

  if (loading) return <Loader color="yellow" />

  const idea = data?.idea as Idea
  const createdAt = new Date(idea?.createdAt)
  const sections = getSections(idea)

  return (
    <>
      <Paper bg="#FCFCFC" radius="md" p="xl">
        {sections.map((section, index) => (
          <IdeaContentSet key={index} {...section} />
        ))}
      </Paper>
      <Group py="lg" mr="lg" position="apart">
        <IdeaManage idea={idea} />
        <Text size="md">{FormatDate(createdAt)}</Text>
      </Group>
    </>
  )
}
