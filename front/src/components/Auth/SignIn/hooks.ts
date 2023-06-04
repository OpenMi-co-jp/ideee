import { showSuccess, showError } from '@/components/notifications'
import Cookies from 'js-cookie'
import { modals } from '@mantine/modals'
import type { LoginContextType } from '@/components/loginContext'

type FormValues = {
  email: string
  password: string
}

export const handleSignIn = async (
  props: FormValues,
  setLoggedIn: LoginContextType['setLoggedIn']
) => {
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
    if (response.status === 200) {
      const token = response.headers.get('authorization')
      if (token) {
        Cookies.set('authToken', String(token), {
          expires: 7,
          secure: true,
        })
      }
      localStorage.setItem('loggedIn', 'true')
      setLoggedIn(true)
      showSuccess({ action: 'ログイン' })
      modals.closeAll()
    } else {
      throw new Error('Request failed with status code: ' + response.status)
    }
  } catch (error) {
    showError({ action: 'ログイン' })
  }
}
