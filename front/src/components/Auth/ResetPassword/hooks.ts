import { showSuccess, showError } from '@/components/showNotification'
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
    const action = 'パスワードリセット'
    passwordReset(props)
      .then(() => {
        showSuccess({ action })
        router.push('/')
      })
      .catch((error: any) => {
        // FIXME: 本当はバックエンドで適切なメッセージを設定し、それを表示させたほうがよいと思われる
        if (error.response?.status === 422) {
          showError({
            action,
            message:
              '入力したパスワードに間違いがある可能性があります、もう一度お試しください。',
          })
        } else {
          throw error
        }
      })
  }

  return { form, onSubmit }
}
