import { showSuccess, showError } from '@/components/showNotification'
import { modals } from '@mantine/modals'
import { signUp } from '@/utils/auth'
import type { SignUpFormValues } from '@/types/user'

export const handleSignUp = async (props: SignUpFormValues) => {
  try {
    const response = await signUp(props)
    const token = response.headers['authorization']
    const { action, message } = response.data
    showSuccess({ action, message })
    modals.closeAll()
  } catch (error: any) {
    if (error.response) {
      // サーバーからのレスポンスがあり、かつステータスコードが200-299以外の場合
      console.error('Request failed with status code: ' + error.response.status)
    } else if (error.request) {
      // リクエストが送られたが、レスポンスが受け取れなかった場合
      console.error('No response received.')
    } else {
      // 何かがリクエストの送信前にエラーを発生させた場合
      console.error('Error setting up the request.')
    }
    showError({ action: 'ユーザー作成' })
    throw error
  }
}
