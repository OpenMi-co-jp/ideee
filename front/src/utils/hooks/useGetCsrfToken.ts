import { useEffect, useState } from 'react'
import axios from 'axios'

export const useGetCsrfToken = () => {
  const [csrfToken, setCsrfToken] = useState('')

  useEffect(() => {
    if (csrfToken) return

    const client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      withCredentials: true,
    })
    client.post('/csrf_token').then((response) => {
      setCsrfToken(response.headers['x-csrf-token'])
    })
  }, [csrfToken])

  return csrfToken
}
