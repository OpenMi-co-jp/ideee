import client from './client'
import Cookies from 'js-cookie'
import type { AuthFormValues } from '@/types/user'

// サインイン
export const signIn = (props: AuthFormValues) => {
  return client.post('/auth/sign_in', props, {
    headers: { 'Content-Type': 'application/json' },
  })
}

// サインアウト
export const signOut = () => {
  const authorization = Cookies.get('authToken')

  return client.delete('/auth/sign_out', {
    headers: {
      'Content-Type': 'application/json',
      authorization: authorization || '',
    },
  })
}
