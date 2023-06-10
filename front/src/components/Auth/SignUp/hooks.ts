import { showSuccess, showError } from '@/components/notifications'
import { modals } from '@mantine/modals'
import { signUp } from '@/utils/auth'
import type { SignUpFormValues } from '@/types/user'

export const handleSignUp = async (props: SignUpFormValues) => {
  try {
    const response = await signUp(props)
    if (response.status === 200) {
      const token = response.headers['authorization']
      showSuccess({
        action: 'ユーザー作成',
        message: '確認用メールをご確認ください',
      })
      modals.closeAll()
    } else {
      throw new Error('Request failed with status code: ' + response.status)
    }
  } catch (error) {
    showError({ action: 'ユーザー作成' })
  }
}
