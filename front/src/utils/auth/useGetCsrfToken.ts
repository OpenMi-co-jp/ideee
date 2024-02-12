// NOTE: auth 内でしか使う予定がないので、 hooks ではなく auth ディレクトリ内に配置しています

import { useEffect, useState } from 'react'
import client from './client'

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
