import { Box, Button, Title, Grid } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { PasswordForm, TextForm } from '../../ReactFormSet'
import { handleSignUp } from './hooks'
import type { CustomNextPage } from 'next'
import { OmniAuth } from '@/components/Auth/OmniAuth'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

type SignUpFormValues = {
  email: string
  password: string
  passwordConfirmation: string
  confirmSuccessUrl: string
}

export const SignUpFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'メールアドレスの形式で入力してください' }),
  password: z
    .string()
    .min(6, { message: '6文字以上のパスワードを入力してください' }),
  passwordConfirmation: z
    .string()
    .min(6, { message: '6文字以上の確認パスワードを入力してください' }),
})

export const SignUpForm: CustomNextPage = () => {
  const confirmSuccessUrl = process.env.NEXT_PUBLIC_FRONT_URL
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
      confirmSuccessUrl: confirmSuccessUrl,
    },
    mode: 'onChange',
  })
  const onSubmit = (data: SignUpFormValues) => handleSignUp(data)
  const router = useRouter()
  const { currentUser } = useCurrentUser()

  useEffect(() => {
    if (currentUser) {
      router.push('/')
    }
  }, [currentUser, router])

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Box maw={300} mx="auto">
        <Title order={2} mb={30}>
          ユーザー登録
        </Title>
        <OmniAuth />
        <TextForm form={form} name="email" label="メールアドレス" required />
        <PasswordForm form={form} name="password" label="パスワード" required />
        <PasswordForm
          form={form}
          name="passwordConfirmation"
          label="確認用パスワード"
          required
        />
        <Grid style={{ marginTop: '1rem' }}>
          <Button type="submit" fullWidth m={10}>
            無料ユーザー作成
          </Button>
        </Grid>
      </Box>
    </form>
  )
}