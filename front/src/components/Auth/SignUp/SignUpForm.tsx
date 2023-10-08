import { Box, Button, Title, Grid } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { PasswordForm, TextForm } from '../../ReactFormSet'
import { handleSignUp } from './hooks'
import type { CustomNextPage } from 'next'

type SignUpFormValues = {
  email: string
  password: string
  passwordConfirmation: string
  confirmSuccessUrl: string
}

export const SignUpForm: CustomNextPage = () => {
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
        <Title order={2} mb={30}>
          ユーザー登録
        </Title>
        <TextForm form={form} name="email" label="メールアドレス" required />
        <PasswordForm form={form} name="password" label="パスワード" required />
        <PasswordForm
          form={form}
          name="passwordConfirmation"
          label="確認用パスワード"
          required
        />
        <Grid style={{ marginTop: '1rem' }}>
          <Button type="submit" fullWidth>
            無料ユーザー作成
          </Button>
        </Grid>
      </Box>
    </form>
  )
}
