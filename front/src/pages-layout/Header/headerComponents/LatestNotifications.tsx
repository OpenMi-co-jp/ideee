import { useGetLatestNotificationsQuery } from '@/lib/generated/client'
import { Divider, Menu, Text, Loader } from '@mantine/core'
import { IconBell } from '@tabler/icons-react'
import { notificationItem } from '@/components/notification/notificationItem'
import Link from 'next/link'
import type {
  Notification,
  GetLatestNotificationsQuery,
} from '@/lib/generated/client'

export const LatestNotifications = () => {
  const { data, loading, error } = useGetLatestNotificationsQuery()
  const notifications =
    data?.latestNotifications as GetLatestNotificationsQuery['latestNotifications']

  return (
    <Menu
      shadow="md"
      width={280}
      // TODO: 既読をつける機能を設定
      // onOpen={() => console.log('opened')}
    >
      <Menu.Target>
        <IconBell size={25} />
      </Menu.Target>

      <Menu.Dropdown>
        {loading && (
          <Menu.Item>
            <Loader />
          </Menu.Item>
        )}
        {error && (
          <Menu.Item>
            <Text size="sm">Error: {error.message}</Text>
          </Menu.Item>
        )}
        {notifications && notifications.length > 0 ? (
          notifications.map((notification) => (
            <Menu.Item key={notification.id}>
              {notificationItem(notification as Notification)}
            </Menu.Item>
          ))
        ) : (
          <Menu.Item>
            <Text size="sm">通知がありません</Text>
          </Menu.Item>
        )}
        <Divider />
        <Menu.Item style={{ textAlign: 'center' }}>
          <Link href="/notifications">
            <Text size="sm">通知一覧を見る</Text>
          </Link>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
