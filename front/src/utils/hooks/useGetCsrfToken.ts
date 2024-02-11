import { useEffect, useState } from 'react'
import axios from 'axios'

export const useGetCsrfToken = () => {
  const [csrfToken, setCsrfToken] = useState('')

  useEffect(() => {
    const client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      withCredentials: true,
    })
    client.get('/csrf_token').then((response) => {
      setCsrfToken(response.data.csrf_token)
    })
  }, [])

  return csrfToken
}
