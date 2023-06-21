export type SignInFormValues = {
  email: string
  password: string
}

export type SignUpFormValues = {
  email: string
  password: string
  passwordConfirmation: string
  confirmSuccessUrl: string
}

export type ResetPasswordFormValues = {
  password: string
  passwordConfirmation: string
}

export type ForgotPasswordFormValues = {
  email: string
}
