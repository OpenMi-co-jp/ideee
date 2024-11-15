import { CreateTeamModal } from '@/components/team/create/CreateTeamModal'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { useIdea } from '@/context/IdeaContext'
import { type GetIdeaQuery } from '@/lib/generated/client'
import { DifficultyBadge, DifficultyBadgeProps } from '@/utils/DifficultyBadge'
import type { StanceBadgeProps } from '@/utils/StanceBadge'
import { StanceBadge } from '@/utils/StanceBadge'
import { Anchor, Button, Flex, Paper, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconApps, IconBrandGithub, IconUsers } from '@tabler/icons-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { IdeaContentSet } from './IdeaContentSet'
import { useCreateTeam } from '@/components/team/create/hook'

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
  const [opened, { open, close }] = useDisclosure(false)
  const { form, onSubmit } = useCreateTeam()
  const { currentUser } = useCurrentUser()

  useEffect(() => {
    if (
      stance === 'team_project' &&
      idea.team === null &&
      idea.userId == currentUser?.id
    ) {
      open()
    }
  }, [idea.team, stance, currentUser, idea.userId, open])

  return (
    <Paper bg="#FCFCFC" radius="md" px={{ base: 'xs', sm: 'xl' }} py="md">
      <Flex direction="row" gap="md">
        <StanceBadge stance={stance as StanceBadgeProps['stance']} />
        <DifficultyBadge
          difficulty={difficulty as DifficultyBadgeProps['difficulty']}
        />
      </Flex>
      <Stack gap="xl" my="lg">
        {sections.map((section, index) => (
          <IdeaContentSet key={index} {...section} />
        ))}
      </Stack>
      {idea.team?.status === 'active' && (
        <Link href={`/teams/${idea.team?.id}`}>
          <Button
            variant="gradient"
            gradient={{ from: 'orange', to: 'yellow' }}
            radius="xl"
            size="sm"
            mr="md"
            leftSection={<IconUsers />}
            mt="xl"
          >
            チーム開発をチェック
          </Button>
        </Link>
      )}
      <CreateTeamModal
        opened={opened}
        onClose={close}
        form={form}
        onSubmit={onSubmit}
      />
      {productUrl && (
        <Anchor href={productUrl} target="_blank">
          <Button
            variant="gradient"
            gradient={{ from: 'green', to: 'blue' }}
            radius="xl"
            size="sm"
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
            size="sm"
            leftSection={<IconBrandGithub />}
            mt="xl"
            mr="md"
          >
            GitHubを確認
          </Button>
        </Anchor>
      )}
    </Paper>
  )
}
