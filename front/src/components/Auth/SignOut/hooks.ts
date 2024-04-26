import { showSuccess, showError } from '@/components/showNotification'
import Cookies from 'js-cookie'
import { signOut } from '@/utils/auth'
import { useCurrentUser } from '@/context/CurrentUserContext'

export const useSignOut = () => {
  const { clearCurrentUser } = useCurrentUser()

  const handleSignOut = async () => {
    try {
      await signOut()
      Cookies.remove('authToken')
      clearCurrentUser()
      showSuccess({ action: 'ログアウト' })
    } catch (error: any) {
      // TODO: error.messageをそのまま出すのはよくないので、ここ以外も含めてエラーハンドリングを考える
      showError({ action: 'ログアウト', message: error.message })
    }
  }

  return handleSignOut
}
