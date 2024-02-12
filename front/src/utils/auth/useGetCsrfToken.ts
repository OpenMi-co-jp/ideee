import { useEffect, useState } from 'react'
import client from '@/utils/auth/client'

export const useGetCsrfToken = () => {
  const [csrfToken, setCsrfToken] = useState('')

  useEffect(() => {
    if (csrfToken) return

    client.post('/csrf_token').then((response) => {
      setCsrfToken(response.headers['x-csrf-token'])
    })
  }, [csrfToken])

  return csrfToken
}
