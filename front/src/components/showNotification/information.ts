import { showNotification } from '@mantine/notifications'

type NotificationProps = {
  title: string
  message?: string
}

export const showInformation = ({ title, message }: NotificationProps) => {
  showNotification({
    color: 'green',
    title,
    message,
    withCloseButton: true,
    autoClose: 5000,
    loading: false,
  })
}
