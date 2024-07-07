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
  const actionName = 'ログイン'
  signIn(props)
    .then((response) => {
      const token = response.headers['authorization']
      // TODO: validateTokenメソッドを設定
      if (token) {
        Cookies.set('authToken', String(token), {
          expires: 7,
          secure: true,
        })
        const decodedToken = DecodeJwt(String(token))
        storeCurrentUser(decodedToken)
      }
      showSuccess({ action: actionName })
    })
    .catch((error) => {
      // FIXME: 本当はバックエンドで適切なメッセージを設定し、それを表示させたほうがよいと思われる
      //        あと、statusのコードを直接条件にするのではなく、他で使っているsuccess変数みたいにbooleanを使ったほうがよい
      if (error.response?.status === 401) {
        showError({
          action: actionName,
          message:
            'メールアドレスかパスワードが間違っています。もう一度やり直してください。',
        })
      } else {
        throw error
      }
    })

  modals.closeAll()
}
