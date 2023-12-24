import { showSuccess, showError } from '@/components/notifications'
import Cookies from 'js-cookie'
import { signOut } from '@/utils/auth'
import type { CurrentUserContextType } from '@/context/CurrentUserContext'

export const HandleSignOut = async (
  logOut: CurrentUserContextType['logOut']
) => {
  try {
    await signOut()
    Cookies.remove('authToken')
    logOut()
    showSuccess({ action: 'ログアウト' })
  } catch (error: any) {
    showError({ action: 'ログアウト', message: error.message })
  }
}
