import { useState, useEffect } from 'react'
import { useLoggedIn } from '@/components/loginContext'
import { Button, Paper, Anchor } from '@mantine/core'
import { IconApps, IconBrandGithub } from '@tabler/icons-react'
import { IdeaContentSet } from './IdeaContentSet'
import type { GetIdeaQuery } from '@/lib/generated/client'
import { useIdea } from '@/context/IdeaContext'

const getSections = (idea: GetIdeaQuery['idea'], isLogin: boolean) => {
  if (isLogin) {
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
  const { loggedIn } = useLoggedIn()
  const [LSLoggedIn, setLSLoggedIn] = useState(false)

  const idea = useIdea()

  useEffect(() => {
    setLSLoggedIn(localStorage.getItem('loggedIn') === 'true')
  }, [])

  const sections = getSections(idea, LSLoggedIn)

  return (
    <>
      <Paper bg="#FCFCFC" radius="md" p="xl">
        {sections.map((section, index) => (
          <IdeaContentSet key={index} {...section} />
        ))}
        {(loggedIn || LSLoggedIn) && (
          <>
            {idea?.productUrl && (
              <Anchor href={idea?.productUrl} target="_blank">
                <Button
                  variant="gradient"
                  gradient={{ from: 'green', to: 'blue' }}
                  radius="xl"
                  size="md"
                  m="md"
                  leftSection={<IconApps />}
                  mt="lg"
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
    </>
  )
}
