import { showNotification } from '@mantine/notifications'

type NotificationProps = {
  message?: string,
  action?: string,
}

export const showSuccess = ({ message = '成功しました', action = '' }: NotificationProps = {}) => {
  const actionWord = action ? action + 'に' : ''
  showNotification({
    color: 'green',
    title: `${actionWord}成功しました`,
    message,
    withCloseButton: true,
    autoClose: 5000,
    loading: false,
  })
}
