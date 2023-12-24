import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { showSuccess } from '@/components/notifications'
import Cookies from 'js-cookie'
import { LoadingOverlay } from '@mantine/core'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { DecodeJwt } from '@/utils/auth'

function AuthCallback() {
  const { logIn } = useCurrentUser()
  const router = useRouter()
  const { query } = router
  const token = query.token

  useEffect(() => {
    if (token) {
      Cookies.set('authToken', String(token), {
        expires: 7,
        secure: true,
      })
      try {
        const decodedToken = DecodeJwt(String(token))
        logIn(decodedToken)
      } catch (error) {
        console.error('Failed to decode JWT:', error)
      }
      router.push('/').then(() => {
        showSuccess({
          action: 'ログイン',
        })
      })
    }
  }, [token, logIn, router])

  return (
    <LoadingOverlay
      loaderProps={{ size: 'sm', color: 'gray', variant: 'bars' }}
      overlayProps={{ opacity: 0.3, color: '#c5c5c5' }}
      visible
    />
  )
}

export default AuthCallback
