import { Alert } from '@mantine/core'

type AlertProps = {
  message?: string
  action?: string
}

export const AlertError = ({
  message = '失敗しました',
  action = 'データの取得に失敗しました',
}: AlertProps = {}) => {
  return (
    <Alert color="red" title={message} radius="md" withCloseButton>
      {action}
    </Alert>
  )
}
