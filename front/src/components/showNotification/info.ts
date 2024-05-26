import { showNotification } from '@mantine/notifications'

type NotificationProps = {
  title: string
  message?: string
}

export const showInfo = ({ title, message }: NotificationProps) => {
  showNotification({
    color: 'gray',
    title,
    message,
    withCloseButton: true,
    autoClose: 5000,
    loading: false,
  })
}
