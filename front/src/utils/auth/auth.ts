import client from './client'
import Cookies from 'js-cookie'
import type {
  SignUpFormValues,
  SignInFormValues,
  ResetPasswordFormValues,
  ForgotPasswordFormValues,
} from '@/types/user'

export const signUp = (props: SignUpFormValues) => {
  return client.post('/users', props, {
    headers: { 'Content-Type': 'application/json' },
  })
}

export const signIn = (props: SignInFormValues) => {
  return client.post('/users/sign_in', props, {
    headers: { 'Content-Type': 'application/json' },
  })
}

export const signOut = () => {
  const authorization = Cookies.get('authToken')

  return client.delete('users/sign_out', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: authorization,
    },
  })
}

export const passwordReset = (props: ResetPasswordFormValues) => {
  const userClient = Cookies.get('client')
  const uid = Cookies.get('uid')
  const accessToken = Cookies.get('accessToken')
  const { password, passwordConfirmation } = props

  return client.put(
    '/users/password',
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
  const redirect_url = process.env.NEXT_PUBLIC_FRONT_URL + '/reset_password'

  return client.post(
    '/users/password',
    { email, redirect_url },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  )
}

export const confirmResend = (props: ForgotPasswordFormValues) => {
  return client.post('/users/confirmation', props, {
    headers: { 'Content-Type': 'application/json' },
  })
}
