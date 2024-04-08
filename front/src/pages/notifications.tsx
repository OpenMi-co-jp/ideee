import { useGetNotificationsQuery } from '@/lib/generated/client'
import { Text, Loader, Paper, Title, Center, Pagination } from '@mantine/core'
import { notificationItem } from '@/components/notification/notificationItem'
import type {
  Notification,
  GetNotificationsQuery,
} from '@/lib/generated/client'
import { useState } from 'react'

function Notifications() {
  const { data, loading, error, refetch } = useGetNotificationsQuery({
    variables: {
      page: 1,
      per: 15,
    },
  })
  const notifications =
    data?.notifications as GetNotificationsQuery['notifications']
  const [page, setPage] = useState(1)
  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    refetch({ page: newPage, per: 15 })
  }

  if (loading) return <Loader />

  return (
    <>
      <Center mb="lg">
        <Title order={1} size="h2">
          通知一覧
        </Title>
      </Center>
      {error && <Text size="sm">Error: {error.message}</Text>}
      {notifications?.pageInfo?.totalCount &&
      notifications.pageInfo.totalCount > 0 ? (
        <>
          {notifications.nodes.map((notification) => (
            <Paper shadow="xs" radius="sm" p="xs" mb="xs" key={notification.id}>
              {notificationItem(notification as Notification)}
            </Paper>
          ))}
          <Center my="xl">
            <Pagination
              total={notifications?.pageInfo?.totalPages || 0}
              onChange={handlePageChange}
            />
          </Center>
        </>
      ) : (
        <Text size="sm">通知がありません</Text>
      )}
    </>
  )
}

export default Notifications
