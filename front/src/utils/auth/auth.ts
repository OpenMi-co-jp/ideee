import client from './client'
import Cookies from 'js-cookie'
import type { SignUpFormValues, SignInFormValues } from '@/types/user'

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
