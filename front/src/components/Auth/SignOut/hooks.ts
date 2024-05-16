import {
  showSuccess,
  showError,
  showInfo,
} from '@/components/showNotification'
import { signOut } from '@/utils/auth'
import { useCurrentUser } from '@/context/CurrentUserContext'

export const useSignOut = () => {
  const { clearCurrentUser } = useCurrentUser()

  const handleSignOut = async () => {
    try {
      await signOut()
      clearCurrentUser()
      showSuccess({ action: 'ログアウト' })
    } catch (error: any) {
      // TODO: error.messageをそのまま出すのはよくないので、ここ以外も含めてエラーハンドリングを考える
      showError({ action: 'ログアウト', message: error.message })
    }
  }

  const forceSignOut = async () => {
    await signOut()
    showInfo({
      title: '一定時間操作がなかった等の理由によりログアウトしました',
    })
  }

  return { handleSignOut, forceSignOut }
}
