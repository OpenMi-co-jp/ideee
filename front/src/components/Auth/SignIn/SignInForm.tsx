import { Box, Grid, Button, Title, Stack } from '@mantine/core'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { PasswordForm, TextForm } from '@/components/ReactFormSet'
import { handleSignIn } from './hooks'
import { useLoggedIn } from '@/components/loginContext'
import type { CustomNextPage } from 'next'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

type SignInFormValues = {
  email: string
  password: string
}

export const SignInForm: CustomNextPage = () => {
  const { setLoggedIn } = useLoggedIn()

  const signInSchema = z.object({
    email: z
      .string()
      .email({ message: 'メールアドレスの形式で入力してください' }),
    password: z
      .string()
      .min(6, { message: '6文字以上のパスワードを入力してください' }),
  })
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  })
  const onSubmit = (data: SignInFormValues) => handleSignIn(data, setLoggedIn)

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Box maw={300} mx="auto">
        <Title order={2} mb={30}>
          ログイン
        </Title>
        <OmniAuth />
        <TextForm form={form} name="email" label="メールアドレス" required />
        <PasswordForm form={form} name="password" label="パスワード" required />
        <Grid mt={'1rem'} mb={'0.5rem'}>
          <Button type="submit" fullWidth m={10}>
            ログイン
          </Button>
        </Grid>
        <Stack>
          <Link href="/user/forgot_password" passHref>
            メールアドレスを忘れた？
          </Link>
        </Stack>
        <Stack>
          <Link href="/user/confirm_resend" passHref>
            確認メールが届いてない？
          </Link>
        </Stack>
      </Box>
    </form>
  )
}
