import { Box, Button } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { PasswordForm, TextForm } from '../../ReactFormSet'
import { handleSignUp } from './hooks'

type SignUpFormValues = {
  email: string
  password: string
  passwordConfirmation: string
  confirmSuccessUrl: string
}

export const SignUpForm = () => {
  const confirmSuccessUrl = process.env.NEXT_PUBLIC_FRONT_URL
  console.log(confirmSuccessUrl)
  const form = useForm<SignUpFormValues>({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
      confirmSuccessUrl: confirmSuccessUrl,
    },
    mode: 'onChange',
  })
  const onSubmit = (data: SignUpFormValues) => handleSignUp(data)

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Box maw={300} mx="auto">
        <TextForm form={form} name="email" label="メールアドレス" required />
        <PasswordForm form={form} name="password" label="パスワード" required />
        <PasswordForm
          form={form}
          name="passwordConfirmation"
          label="確認用パスワード"
          required
        />
        <Button type="submit">無料ユーザー作成</Button>
      </Box>
    </form>
  )
}
