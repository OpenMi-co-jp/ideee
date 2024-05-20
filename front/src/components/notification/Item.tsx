import { Group, Text, Indicator } from '@mantine/core'
import { UserIcon } from '@/components/user'
import Link from 'next/link'
import dayjs from '@/lib/format/dayjs'
import type { Notification } from '@/lib/generated/client'

const getNotificationMessage = (type?: string | null) => {
  switch (type) {
    case 'LikeIdea':
      return 'にハートを送りました'
    case 'LikeComment':
      return 'のコメントにハートを送りました'
    case 'Comment':
      return 'にコメントしました'
    case 'Like':
      return 'にハートを送りました' // TODO: 削除予定
    case 'Difficulty':
      return 'に難易度の投票をしました'
    case 'product_apply':
      return 'のプロダクトURLを承認しました'
    case 'join_team_user':
      return 'のチーム開発に参加しました'
    case 'leave_team_user':
      return 'のチーム開発から脱退しました'
    default:
      return ''
  }
}

export const NotificationItem = (notification: Notification) => {
  return (
    <Indicator
      color="orange"
      label="New"
      position="top-start"
      size={14}
      disabled={notification?.checked}
    >
      <Group>
        <Link href={`/users/${notification?.visitor?.id}`} passHref>
          <UserIcon userIcon={notification?.visitor?.image} />
        </Link>
        <Text size="sm" maw={'80%'}>
          {notification.visitor?.name}さんが
          <Link href={`/ideas/${notification.ideaId}`}>
            {notification.idea?.name}
          </Link>
          {getNotificationMessage(notification?.notificatableType)}
        </Text>
      </Group>
      <Text size="xs" c="gray" style={{ textAlign: 'right' }}>
        {dayjs(notification.createdAt).format('YYYY/MM/DD HH:mm')}
      </Text>
    </Indicator>
  )
}
