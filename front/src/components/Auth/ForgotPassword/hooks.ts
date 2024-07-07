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
    passwordForgot(props)
      .then(() => {
        showSuccess({
          action: actionName,
          message: 'メールをご確認ください',
        })
      })
      .catch((error: any) => {
        // FIXME: 本当はバックエンドで適切なメッセージを設定し、それを表示させたほうがよいと思われる
        //        あと、statusのコードを直接条件にするのではなく、他で使っているsuccess変数みたいにbooleanを使ったほうがよい
        if (error.response?.status === 422) {
          showError({
            action: actionName,
            message: 'メールアドレスに間違いがないかご確認ください。',
          })
        } else {
          throw error
        }
      })
  }

  return { form, onSubmit }
}
