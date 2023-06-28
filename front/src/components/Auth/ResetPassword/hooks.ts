import { showSuccess, showError } from '@/components/notifications'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import type { ResetPasswordFormValues } from '@/types/user'
import { passwordReset } from '@/utils/auth'

export const useResetPassword = () => {
  const form = useForm<ResetPasswordFormValues>({
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
    mode: 'onChange',
  })

  const router = useRouter()
  const onSubmit = async (props: ResetPasswordFormValues) => {
    try {
      const response = await passwordReset(props)
      if (response.status === 200) {
        showSuccess({ action: 'パスワードリセット' })
        router.push('/')
      } else {
        throw new Error('Request failed with status code: ' + response.status)
      }
    } catch (error: any) {
      showError({
        action: 'パスワードリセット',
        message: error.message as string,
      })
    }
  }

  return { form, onSubmit }
}
