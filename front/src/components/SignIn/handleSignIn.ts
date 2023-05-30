import { notifications } from '@mantine/notifications'
import Cookies from 'js-cookie'

type FormValues = {
  email: string
  password: string
}

export const handleSignIn = async (props: FormValues) => {
  const { email, password } = props

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + 'auth/sign_in',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      }
    )
    const data = response.json()
    const token = response.headers.get('authorization')
    if (token) {
      Cookies.set('authToken', String(token), {
        expires: 7,
        secure: true,
      })
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
