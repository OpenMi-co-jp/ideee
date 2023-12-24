import { showSuccess, showError } from '@/components/notifications'
import Cookies from 'js-cookie'
import { signOut } from '@/utils/auth'
import type { CurrentUserContextType } from '@/context/CurrentUserContext'

export const HandleSignOut = async (
  clearCurrentUser: CurrentUserContextType['clearCurrentUser']
) => {
  try {
    await signOut()
    Cookies.remove('authToken')
    clearCurrentUser()
    showSuccess({ action: 'ログアウト' })
  } catch (error: any) {
    showError({ action: 'ログアウト', message: error.message })
  }
}
