import { Button, Flex, Group, Switch } from '@mantine/core'
import { useState } from 'react'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { useGetNotificationConfigQuery } from '@/lib/generated/client'
import { LoaderBox } from '@/components/features'
import { AlertError } from '@/components/alert'

export const MailSettingForm = () => {
  const { currentUser } = useCurrentUser()
  const { data, loading, error } = useGetNotificationConfigQuery({
    variables: {
      userId: currentUser?.id.toString() || '',
    },
  })

  const initailContents = [
    {
      id: 1,
      label: 'アイデアへのコメント',
      checked: data?.notificationConfig.commentEmail,
    },
    {
      id: 2,
      label: 'コメントのお知らせ',
      checked: data?.notificationConfig.commentWeb,
    },
    {
      id: 3,
      label: '下書きへのリマインド',
      checked: data?.notificationConfig.draftRemindEmail,
    },
    {
      id: 4,
      label: 'イベントのお知らせ',
      checked: data?.notificationConfig.eventEmail,
    },
    {
      id: 5,
      label: 'ハートのお知らせ',
      checked: data?.notificationConfig.heartEmail,
    },
    {
      id: 6,
      label: 'ハートへのコメント',
      checked: data?.notificationConfig.heartToCommentWeb,
    },
    {
      id: 7,
      label: 'ハートのお知らせ(Web)',
      checked: data?.notificationConfig.heartWeb,
    },
    {
      id: 8,
      label: 'チーム開発参加のお知らせ',
      checked: data?.notificationConfig.teamJoinEmail,
    },
    {
      id: 9,
      label: 'チーム開発参加のお知らせ(Web)',
      checked: data?.notificationConfig.teamJoinWeb,
    },
    {
      id: 10,
      label: 'チーム開発のメッセージ',
      checked: data?.notificationConfig.teamMessageEmail,
    },
    {
      id: 11,
      label: '投票のお知らせ',
      checked: data?.notificationConfig.voteWeb,
    },
    {
      id: 12,
      label: '週間ランキング',
      checked: data?.notificationConfig.weeklyEmail,
    },
  ]

  const [items, setItems] = useState(initailContents)

  if (loading) return <LoaderBox />
  if (error) return <AlertError />

  console.log(data)

  const handleSwitchChange = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, checked: !item.checked }
        }
        return item
      })
    )
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(items)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Group p="md">
        <Flex direction="column" gap="xl">
          {items.map((item) => (
            <Switch
              key={item.id}
              label={item.label}
              name={`switch-${item.id}`}
              defaultChecked={item.checked}
              onChange={() => handleSwitchChange(item.id)}
            />
          ))}
          <Button type="submit">送信</Button>
        </Flex>
      </Group>
    </form>
  )
}
