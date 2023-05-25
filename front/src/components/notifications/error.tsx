import { showNotification } from '@mantine/notifications'

type NotificationProps = {
  message?: string
  action?: string
}

export const showError = ({
  message = '失敗しました',
  action = '',
}: NotificationProps = {}) => {
  const actionWord = action ? action + 'に' : ''
  showNotification({
    color: 'red',
    title: `${actionWord}失敗しました`,
    message,
    withCloseButton: true,
    autoClose: 5000,
    loading: false,
  })
}
