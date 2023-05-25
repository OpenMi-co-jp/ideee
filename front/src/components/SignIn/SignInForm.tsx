import { Box, Button } from '@mantine/core'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { PasswordForm, TextForm } from '../ReactFormSet'
import { handleSignIn } from './handleSignIn'
import { useLoggedIn } from '@/components/loginContext'

type SignInFormValues = {
  email: string
  password: string
}

export const SignInForm = () => {
  const { setLoggedIn } = useLoggedIn()
  const form = useForm<SignInFormValues>({
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
        <TextForm form={form} name="email" label="メールアドレス" required />
        <PasswordForm form={form} name="password" label="パスワード" required />
        <Button type="submit">ログイン</Button>
      </Box>
    </form>
  )
}
