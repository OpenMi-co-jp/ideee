import { showSuccess, showError } from '@/components/showNotification'
import Cookies from 'js-cookie'
import { modals } from '@mantine/modals'
import type { CurrentUserContextType } from '@/context/CurrentUserContext'
import { signIn } from '@/utils/auth'
import type { SignInFormValues } from '@/types/user'
import { DecodeJwt } from '@/utils/auth'

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
        // expires: 7, TODO: deviseでtimeoutを設定していないので、ここも無期限にしたが、後でちゃんと考える see: https://github.com/naru20181117/ideee/issues/1300
        secure: true,
      })
      const decodedToken = DecodeJwt(String(token))
      storeCurrentUser(decodedToken)
    }
    showSuccess({ action: 'ログイン' })
    modals.closeAll()
  } catch (error) {
    showError({ action: 'ログイン' })
  }
}
