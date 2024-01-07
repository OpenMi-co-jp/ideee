import { showSuccess, showError } from '@/components/notifications'
import { useForm } from 'react-hook-form'
import type { ConfirmResendFormValues } from '@/types/user'
import { confirmResend } from '@/utils/auth'

export const useConfirmResend = () => {
  const form = useForm<ConfirmResendFormValues>({
    defaultValues: { email: '' },
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
