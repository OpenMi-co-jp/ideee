import { showSuccess, showError } from '@/components/notifications'
import Cookies from 'js-cookie'
import { modals } from '@mantine/modals'
import type { LoginContextType } from '@/components/loginContext'
import { signIn } from '@/utils/auth'
import type { SignInFormValues } from '@/types/user'

export const handleSignIn = async (
  props: SignInFormValues,
  setLoggedIn: LoginContextType['setLoggedIn']
) => {
  try {
    const response = await signIn(props)
    const token = response.headers['authorization']
    // TODO: validateTokenメソッドを設定
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
  } catch (error) {
    showError({ action: 'ログイン' })
  }
}
