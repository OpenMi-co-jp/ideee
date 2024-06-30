import { Button, Paper, Anchor, Flex } from '@mantine/core'
import { IconApps, IconBrandGithub } from '@tabler/icons-react'
import { IdeaContentSet } from './IdeaContentSet'
import type { GetIdeaQuery } from '@/lib/generated/client'
import { useIdea } from '@/context/IdeaContext'
import { StanceBadge } from '@/utils/StanceBadge'
import type { StanceBadgeProps } from '@/utils/StanceBadge'
import { DifficultyBadge, DifficultyBadgeProps } from '@/utils/DifficultyBadge'

const getSections = (idea: GetIdeaQuery['idea']) => {
  return [
    { label: '背景', content: idea?.background },
    { label: 'ゴール', content: idea?.goal },
    { label: 'イシュー', content: idea?.issue },
    { label: 'メイン機能', content: idea?.wishFunction },
    { label: '仮説(数値的)', content: idea?.hypothesis },
    { label: 'ターゲット(ペルソナ)', content: idea?.target },
    { label: 'マネタイズ方法', content: idea?.monetize },
    { label: '類似サービス', content: idea?.similar },
    // { label: '補足', content: idea?.note }, TODO: 後で表示 see: https://github.com/naru20181117/ideee/issues/1368
  ]
}

export const IdeaContents = () => {
  const idea = useIdea()
  const { stance, difficulty, productUrl, githubUrl } = idea
  const sections = getSections(idea)

  return (
    <Paper bg="#FCFCFC" radius="md" px="xl" py="md">
      <Flex direction="row" gap="md">
        <StanceBadge stance={stance as StanceBadgeProps['stance']} />
        <DifficultyBadge
          difficulty={difficulty as DifficultyBadgeProps['difficulty']}
        />
      </Flex>
      {sections.map((section, index) => (
        <IdeaContentSet key={index} {...section} />
      ))}
      {productUrl && (
        <Anchor href={productUrl} target="_blank">
          <Button
            variant="gradient"
            gradient={{ from: 'green', to: 'blue' }}
            radius="xl"
            size="md"
            mr="md"
            leftSection={<IconApps />}
            mt="xl"
          >
            アプリを確認
          </Button>
        </Anchor>
      )}
      {githubUrl && (
        <Anchor href={githubUrl} target="_blank">
          <Button
            color="dark"
            radius="xl"
            size="md"
            leftSection={<IconBrandGithub />}
            mt="xl"
          >
            GitHubを確認
          </Button>
        </Anchor>
      )}
    </Paper>
  )
}
