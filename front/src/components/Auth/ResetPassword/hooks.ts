import { showSuccess, showError } from '@/components/notifications'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import type { ResetPasswordFormValues } from '@/types/user'
import { passwordReset } from '@/utils/auth'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const useResetPassword = () => {
  const PasswordResetFormSchema = z.object({
    password: z
      .string()
      .min(6, { message: '6文字以上のパスワードを入力してください' }),
    passwordConfirmation: z
      .string()
      .min(6, { message: '6文字以上の確認パスワードを入力してください' }),
  })
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(PasswordResetFormSchema),
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
