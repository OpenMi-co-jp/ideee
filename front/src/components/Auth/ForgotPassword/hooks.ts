import { showSuccess, showError } from '@/components/showNotification'
import { useForm } from 'react-hook-form'
import type { ForgotPasswordFormValues } from '@/types/user'
import { passwordForgot } from '@/utils/auth'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const useForgotPassword = () => {
  const passwordForgotSchema = z.object({
    email: z
      .string()
      .email({ message: 'メールアドレスの形式で入力してください' }),
  })
  const form = useForm<ForgotPasswordFormValues>({
    defaultValues: { email: '' },
    resolver: zodResolver(passwordForgotSchema),
    mode: 'onChange',
  })

  const onSubmit = async (props: ForgotPasswordFormValues) => {
    const actionName = 'パスワードリセット用メール送信'
    const response = await passwordForgot(props)
    if (response.status === 200) {
      showSuccess({
        action: actionName,
        message: 'メールをご確認ください',
      })
    } else {
      throw new Error('Request failed with status code: ' + response.status)
    }
  }

  return { form, onSubmit }
}
