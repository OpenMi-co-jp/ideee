import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { showSuccess } from '@/components/notifications'
import Cookies from 'js-cookie'
import { LoadingOverlay } from '@mantine/core'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { verifyJwt } from '@/utils/auth'

function AuthCallback() {
  const { storeCurrentUser } = useCurrentUser()
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
        const decodedToken = verifyJwt(String(token))
        storeCurrentUser(decodedToken as any)
      } catch (error) {
        console.error('Failed to decode JWT:', error)
      }
      router.push('/').then(() => {
        showSuccess({
          action: 'ログイン',
        })
      })
    }
  }, [token, storeCurrentUser, router])

  return (
    <LoadingOverlay
      loaderProps={{ size: 'sm', color: 'gray', variant: 'bars' }}
      overlayProps={{ opacity: 0.3, color: '#c5c5c5' }}
      visible
    />
  )
}

export default AuthCallback
