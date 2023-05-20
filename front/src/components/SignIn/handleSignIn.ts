import { notifications } from '@mantine/notifications'
// import { IconCheck, IconX } from '@tabler/icons-react'

type FormValues = {
  email: string
  password: string
}

export const handleSignIn = async (props: FormValues) => {
  const { email, password } = props

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + '/auth/sign_in',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      }
    )
    const data = response.json()
    if (response.headers.get('authorization')) {
      localStorage.setItem(
        'authorization',
        String(response.headers.get('authorization'))
      )
    }

    notifications.show({
      id: 'error-notification',
      withCloseButton: true,
      autoClose: 5000,
      title: 'ログインに成功しました',
      message: 'ログインに成功しました',
      color: 'green',
      style: { backgroundColor: 'green' },
      sx: { backgroundColor: 'green' },
      loading: false,
    })
  } catch (error) {
    console.error(error)
    notifications.show({
      id: 'error-notification',
      withCloseButton: true,
      autoClose: 5000,
      title: 'ログインに失敗しました',
      message: 'ログインに失敗しました',
      color: 'red',
      style: { backgroundColor: 'red' },
      sx: { backgroundColor: 'red' },
      loading: false,
    })
  }
}
