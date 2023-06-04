import { showSuccess, showError } from '@/components/notifications'
import Cookies from 'js-cookie'
import type { LoginContextType } from '@/components/loginContext'
import { signOut } from '@/utils/auth'

export const handleSignOut = async (
  setLoggedIn: LoginContextType['setLoggedIn']
) => {
  try {
    const response = await signOut()
    if (response.status === 200) {
      Cookies.remove('authToken')
      setLoggedIn(false)
      localStorage.setItem('loggedIn', 'false')
      showSuccess({ action: 'ログアウト' })
    } else {
      throw new Error('Request failed with status code: ' + response.status)
    }
  } catch (error) {
    setLoggedIn(false)
    localStorage.setItem('loggedIn', 'false')
    showError({ action: 'ログアウト' })
  }
}
