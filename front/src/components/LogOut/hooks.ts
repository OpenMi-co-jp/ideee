import { showSuccess, showError } from '@/components/notifications'
import Cookies from 'js-cookie'
import type { LoginContextType } from '@/components/loginContext'
export const handleSignOut = async (
  setLoggedIn: LoginContextType['setLoggedIn']
) => {
  try {
    const authorization = Cookies.get('authToken')
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + 'auth/sign_out',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: authorization || '',
        },
      }
    )
    if (response.status === 200) {
      setLoggedIn(false)
      showSuccess({ action: 'ログアウト' })
    } else {
      throw new Error('Request failed with status code: ' + response.status)
    }
  } catch (error) {
    showError({ action: 'ログアウト' })
  }
}
