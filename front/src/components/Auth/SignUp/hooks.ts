import { showSuccess, showError } from '@/components/showNotification'
import { modals } from '@mantine/modals'
import { signUp } from '@/utils/auth'
import type { SignUpFormValues } from '@/types/user'
import { NextRouter } from 'next/router'

export const handleSignUp = async (
  props: SignUpFormValues,
  router: NextRouter
) => {
  try {
    const response = await signUp(props)
    const { action, message } = response.data
    modals.closeAll()
    showSuccess({ action, message })
    router.push('/users/sign_in')
  } catch (error: any) {
    // FIXME: ここはどうエラーハンドリングさせたいかがよくわからなかったので、422のレスポンスが返ってきたときだけメッセージを出すようにしているが、本当は設計し直したほうがいいと思う
    //        あと、statusのコードを直接条件にするのではなく、他で使っているsuccess変数みたいにbooleanを使ったほうがよい
    if (error.response) {
      // サーバーからのレスポンスがあり、かつステータスコードが200-299以外の場合
      if (error.response?.status === 422) {
        showError({ action: 'ユーザー作成' })
      } else {
        throw error
      }
    } else if (error.request) {
      // リクエストが送られたが、レスポンスが受け取れなかった場合
      console.error('No response received.')
      throw error
    } else {
      // 何かがリクエストの送信前にエラーを発生させた場合
      console.error('Error setting up the request.')
      throw error
    }
  }
}
