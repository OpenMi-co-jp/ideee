import { showSuccess, showError } from '@/components/notifications'
import Cookies from 'js-cookie'
import type { LoginContextType } from '@/components/loginContext'
import { signOut } from '@/utils/auth'

export const handleSignOut = async (
  setLoggedIn: LoginContextType['setLoggedIn']
) => {
  try {
    const response = await signOut()
    Cookies.remove('authToken')
    setLoggedIn(false)
    localStorage.setItem('loggedIn', 'false')
    showSuccess({ action: 'ログアウト' })
  } catch (error: any) {
    showError({ action: 'ログアウト', message: error.message })
  }
}
