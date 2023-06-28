export type SignUpFormValues = {
  email: string
  password: string
  passwordConfirmation: string
  confirmSuccessUrl: string
}

export type SignInFormValues = Pick<SignUpFormValues, 'email' | 'password'>

export type ResetPasswordFormValues = Pick<
  SignUpFormValues,
  'password' | 'passwordConfirmation'
>

export type ForgotPasswordFormValues = Pick<SignUpFormValues, 'email'>

export type ConfirmResendFormValues = Pick<SignUpFormValues, 'email'>
