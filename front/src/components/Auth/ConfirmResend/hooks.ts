import { showSuccess, showError } from '@/components/notifications'
import { useForm } from 'react-hook-form'
import type { ConfirmResendFormValues } from '@/types/user'
import { confirmResend } from '@/utils/auth'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const useConfirmResend = () => {
  const confirmResendSchema = z.object({
    email: z
      .string()
      .email({ message: 'メールアドレスの形式で入力してください' }),
  })
  const form = useForm<ConfirmResendFormValues>({
    defaultValues: { email: '' },
    resolver: zodResolver(confirmResendSchema),
    mode: 'onChange',
  })

  const onSubmit = async (props: ConfirmResendFormValues) => {
    const actionName = '確認用メール再送信'
    try {
      await confirmResend(props)
      showSuccess({
        action: actionName,
        message: 'メールをご確認ください',
      })
    } catch (error: any) {
      showError({
        action: actionName,
        message: error.response.data.message,
      })
    }
  }

  return { form, onSubmit }
}
