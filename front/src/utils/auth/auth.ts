import client from './client'
import Cookies from 'js-cookie'
import type {
  SignUpFormValues,
  SignInFormValues,
  ResetPasswordFormValues,
  ForgotPasswordFormValues,
} from '@/types/user'

export const signUp = (props: SignUpFormValues) => {
  return client.post('/auth', props, {
    headers: { 'Content-Type': 'application/json' },
  })
}

export const signIn = (props: SignInFormValues) => {
  return client.post('/auth/sign_in', props, {
    headers: { 'Content-Type': 'application/json' },
  })
}

export const signOut = () => {
  const authorization = Cookies.get('authToken')

  return client.delete('/auth/sign_out', {
    headers: {
      'Content-Type': 'application/json',
      authorization: authorization || '',
    },
  })
}

export const passwordReset = (props: ResetPasswordFormValues) => {
  const userClient = Cookies.get('client')
  const uid = Cookies.get('uid')
  const accessToken = Cookies.get('accessToken')
  const { password, passwordConfirmation } = props

  return client.put(
    '/auth/password',
    { password, password_confirmation: passwordConfirmation },
    {
      headers: {
        'Content-Type': 'application/json',
        'access-token': accessToken,
        client: userClient,
        uid,
      },
    }
  )
}

export const passwordForgot = (props: ForgotPasswordFormValues) => {
  const { email } = props
  const redirect_url = process.env.NEXT_PUBLIC_FRONT_URL + 'reset_password'

  return client.post(
    '/auth/password',
    { email, redirect_url },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  )
}
