import { TextInput, Box, Button, PasswordInput } from '@mantine/core'
import * as React from 'react'
import { useForm, useController, UseControllerProps } from 'react-hook-form'
import { PasswordForm, TextForm } from '../ReactFormSet'
import { handleSignIn } from './handleSignIn'

type SignInFormValues = {
  email: string
  password: string
}

export const SignInForm = () => {
  const form = useForm<SignInFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  })
  const onSubmit = (data: SignInFormValues) => handleSignIn(data)

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
