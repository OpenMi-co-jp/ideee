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
    const response = await passwordReset(props)
    if (response.status === 200) {
      showSuccess({ action: 'パスワードリセット' })
      router.push('/')
    } else {
      // FIXME: 本当は500エラーの可能性もあるので決め打ちでエラーメッセージを出すのはよくないが、バックエンドでちゃんとハンドリングされていないのでそちらから修正する必要がある
      // ref. https://github.com/naru20181117/ideee/pull/1501/files#r1660331233
      showError({
        action: 'パスワードリセット',
        message: 'もう一度お試しください。',
      })
    }
  }

  return { form, onSubmit }
}
