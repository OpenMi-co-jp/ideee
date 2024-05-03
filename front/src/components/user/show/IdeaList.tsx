import { useUser } from '@/context/userProfileContext'
import { Tabs } from '@mantine/core'
import {
  IconBulb,
  IconHeart,
  IconMessageCircle,
  IconUsers,
  IconPencil,
} from '@tabler/icons-react'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { DraftIdeas, PublishedIdeas } from '@/components/idea/list'

export const IdeaList = () => {
  const user = useUser()
  const { currentUser } = useCurrentUser()
  const isMyPage = String(currentUser?.id) === user?.id

  return (
    <Tabs color="yellow" variant="pills" defaultValue="idea_list" mt={'xl'}>
      <Tabs.List>
        <Tabs.Tab value="idea_list" leftSection={<IconBulb />}>
          アイデア
        </Tabs.Tab>
        <Tabs.Tab value="heart_list" leftSection={<IconHeart />}>
          ハート
        </Tabs.Tab>
        <Tabs.Tab value="comment_list" leftSection={<IconMessageCircle />}>
          コメント
        </Tabs.Tab>
        <Tabs.Tab value="team_list" leftSection={<IconUsers />}>
          チーム開発
        </Tabs.Tab>
        {isMyPage && (
          <Tabs.Tab value="draft" leftSection={<IconPencil />}>
            下書き
          </Tabs.Tab>
        )}
      </Tabs.List>

      <Tabs.Panel value="idea_list">
        <PublishedIdeas userId={user!.id} />
      </Tabs.Panel>

      <Tabs.Panel value="heart_list">
        Coming Soon <IconHeart />
      </Tabs.Panel>

      <Tabs.Panel value="comment_list">
        Coming Soon <IconMessageCircle />
      </Tabs.Panel>

      <Tabs.Panel value="team_list">
        Coming Soon <IconUsers />
      </Tabs.Panel>

      {isMyPage && (
        <Tabs.Panel value="draft">
          <DraftIdeas />
        </Tabs.Panel>
      )}
    </Tabs>
  )
}
