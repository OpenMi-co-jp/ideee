import { showSuccess, showError } from '@/components/notifications'
import Cookies from 'js-cookie'
import { modals } from '@mantine/modals'
import type { CurrentUserContextType } from '@/context/CurrentUserContext'
import { signIn } from '@/utils/auth'
import type { SignInFormValues } from '@/types/user'
import { verifyJwt } from '@/utils/auth'

export const handleSignIn = async (
  props: SignInFormValues,
  storeCurrentUser: CurrentUserContextType['storeCurrentUser']
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
      const decodedToken = verifyJwt(String(token))
      storeCurrentUser(decodedToken as any)
    }
    showSuccess({ action: 'ログイン' })
    modals.closeAll()
  } catch (error) {
    showError({ action: 'ログイン' })
  }
}
