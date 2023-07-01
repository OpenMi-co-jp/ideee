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
    try {
      const response = await confirmResend(props)
      if (response.status === 200) {
        showSuccess({ action: '確認用メール再送信' })
      } else {
        throw new Error('Request failed with status code: ' + response.status)
      }
    } catch (error: any) {
      showError({
        action: '確認用メール再送信',
        message: error.message as string,
      })
    }
  }

  return { form, onSubmit }
}
