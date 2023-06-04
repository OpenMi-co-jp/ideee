import { showSuccess, showError } from '@/components/notifications'
import Cookies from 'js-cookie'
import { modals } from '@mantine/modals'
import type { LoginContextType } from '@/components/loginContext'
import { signIn } from '@/utils/auth'
import type { AuthFormValues } from '@/types/user'

export const handleSignIn = async (
  props: AuthFormValues,
  setLoggedIn: LoginContextType['setLoggedIn']
) => {
  try {
    const response = await signIn(props)
    if (response.status === 200) {
      const token = response.headers['authorization']
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
