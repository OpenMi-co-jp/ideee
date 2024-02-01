import { useCurrentUser } from '@/context/CurrentUserContext'
import { Button, Paper, Anchor } from '@mantine/core'
import { IconApps, IconBrandGithub } from '@tabler/icons-react'
import { IdeaContentSet } from './IdeaContentSet'
import type { GetIdeaQuery } from '@/lib/generated/client'
import { useIdea } from '@/context/IdeaContext'
import { StanceBadge } from '@/utils/StanceBadge'
import type { StanceBadgeProps } from '@/utils/StanceBadge'

const getSections = (idea: GetIdeaQuery['idea'], currentUser: boolean) => {
  if (currentUser) {
    return [
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
  } else {
    return [
      { label: '背景', content: idea?.background },
      { label: 'ゴール', content: idea?.goal },
    ]
  }
}

export const IdeaContents = () => {
  const { currentUser } = useCurrentUser()
  const idea = useIdea()
  const sections = getSections(idea, Boolean(currentUser))

  return (
    <Paper bg="#FCFCFC" radius="md" px="xl" py="md">
      <StanceBadge stance={idea?.stance as StanceBadgeProps['stance']} />
      {sections.map((section, index) => (
        <IdeaContentSet key={index} {...section} />
      ))}
      {currentUser && (
        <>
          {idea?.productUrl && (
            <Anchor href={idea?.productUrl} target="_blank">
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
          {idea?.githubUrl && (
            <Anchor href={idea?.githubUrl} target="_blank">
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
        </>
      )}
    </Paper>
  )
}
