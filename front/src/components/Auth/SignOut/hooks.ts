import { showSuccess, showError, showInfo } from '@/components/showNotification'
import { signOut } from '@/utils/auth'
import { useCurrentUser } from '@/context/CurrentUserContext'

export const useSignOut = () => {
  const { clearCurrentUser } = useCurrentUser()

  const handleSignOut = async () => {
    await signOut()
    clearCurrentUser()
    showSuccess({ action: 'ログアウト' })
  }

  const forceSignOut = async () => {
    await signOut()
    showInfo({
      title: 'ログインし直してください',
      message: 'ログインセッションが切れました',
    })
  }

  return { handleSignOut, forceSignOut }
}
