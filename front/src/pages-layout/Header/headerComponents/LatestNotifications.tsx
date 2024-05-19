import {
  useGetLatestNotificationsQuery,
  useCheckNotificationsMutation,
} from '@/lib/generated/client'
import { Divider, Menu, Text, Loader, Indicator } from '@mantine/core'
import { IconBell } from '@tabler/icons-react'
import { notificationItem } from '@/components/notification/notificationItem'
import Link from 'next/link'
import type {
  Notification,
  GetLatestNotificationsQuery,
} from '@/lib/generated/client'
import { useState, useEffect } from 'react'

export const LatestNotifications = () => {
  const { data, loading, error } = useGetLatestNotificationsQuery()
  const notifications =
    data?.latestNotifications as GetLatestNotificationsQuery['latestNotifications']
  const [isNotificationChecked, setIsNotificationChecked] = useState(true)
  const [checkNotifications] = useCheckNotificationsMutation({
    variables: {
      input: {},
    },
  })

  useEffect(() => {
    if (notifications) {
      const allChecked = notifications.every(
        (notification) => notification.checked
      )
      setIsNotificationChecked(allChecked)
    }
  }, [notifications])

  const handleNotificationCheck = () => {
    checkNotifications({})
    setIsNotificationChecked(true)
  }

  return (
    <Menu
      shadow="md"
      width={280}
      onOpen={handleNotificationCheck}
      // TODO: 既読をつける機能を設定
      // onOpen={() => console.log('opened')}
    >
      <Menu.Target>
        <Indicator
          disabled={isNotificationChecked}
          color="red"
          offset={4}
          processing
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <IconBell size={25} />
        </Indicator>
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
