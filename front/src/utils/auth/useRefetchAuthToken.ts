import client from './client'
import Cookies from 'js-cookie'
import { useFetchCsrfToken } from './useFetchCsrfToken'

export const useRefetchAuthToken = () => {
  const csrfToken = useFetchCsrfToken()

  const refetchAuthToken = async (): Promise<boolean> => {
    return client
      .post('/auth_token', {
        authenticity_token: csrfToken,
      })
      .then((response) => {
        const token = response.headers['authorization']
        if (!token) return false

        // TODO: authTokenのCookieの扱いが散らばってしまっているので、hooksに集約する
        Cookies.set('authToken', String(token), {
          expires: 7,
          secure: true,
        })
        return true
      })
      .catch(() => {
        return false
      })
  }

  return refetchAuthToken
}
