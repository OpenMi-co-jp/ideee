import { showSuccess, showError } from '@/components/notifications'
import { useForm } from 'react-hook-form'
import type { ForgotPasswordFormValues } from '@/types/user'
import { passwordForgot } from '@/utils/auth'

export const useForgotPassword = () => {
  const form = useForm<ForgotPasswordFormValues>({
    defaultValues: { email: '' },
    mode: 'onChange',
  })

  const onSubmit = async (props: ForgotPasswordFormValues) => {
    try {
      const response = await passwordForgot(props)
      if (response.status === 200) {
        showSuccess({ action: 'パスワードリセット用メール送信' })
      } else {
        throw new Error('Request failed with status code: ' + response.status)
      }
    } catch (error: any) {
      showError({
        action: 'パスワードリセット用メール送信',
        message: error.message as string,
      })
    }
  }

  return { form, onSubmit }
}
