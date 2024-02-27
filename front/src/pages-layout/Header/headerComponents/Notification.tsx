import { useGetNotificationsQuery } from '@/lib/generated/client'
import { Divider, Menu, Text } from '@mantine/core'
import { IconBell } from '@tabler/icons-react'

export const Notification = () => {
  const { data, loading, error } = useGetNotificationsQuery()

  return (
    <Menu>
      <Menu.Target>
        <IconBell size={25} />
      </Menu.Target>

      <Menu.Dropdown>
        {loading && (
          <Menu.Item>
            <Text size="sm">Loading...</Text>
          </Menu.Item>
        )}
        {error && (
          <Menu.Item>
            <Text size="sm">Error: {error.message}</Text>
          </Menu.Item>
        )}
        {data && data.getNotifications.length > 0 ? (
          data.getNotifications.map((notification: any) => (
            <Menu.Item key={notification.id}>
              <Text size="sm">
                {notification.visitor.name}さんが
                <Text
                  component="a"
                  href={`/ideas/${notification.ideaId}`}
                  style={{ textDecoration: 'none' }}
                >
                  {notification.ideaTitle}
                </Text>
                にコメントしました。
              </Text>
              <Text size="xs">
                {notification.date} {notification.time}
              </Text>
            </Menu.Item>
          ))
        ) : (
          <Menu.Item>
            <Text size="sm">通知がありません</Text>
          </Menu.Item>
        )}
        <Divider />
        <Menu.Item>
          {/* TODO: 通知一覧ページを作成する + リンクを貼る  */}
          <Text size="sm">通知一覧を見る</Text>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
