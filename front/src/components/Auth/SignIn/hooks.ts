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
      showSuccess({ action: 'ログイン' })
    })
    .catch(() => {
      // FIXME: 本当は500エラーの可能性もあるので決め打ちでエラーメッセージを出すのはよくないが、バックエンドでちゃんとハンドリングされていないのでそちらから修正する必要がある
      // ref. https://github.com/naru20181117/ideee/pull/1501/files#r1660337857
      showError({
        action: 'ログイン',
        message:
          'メールアドレスかパスワードが間違っています。もう一度やり直してください。',
      })
    })

  modals.closeAll()
}
