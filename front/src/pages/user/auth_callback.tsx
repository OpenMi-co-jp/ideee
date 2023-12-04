import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { showSuccess } from '@/components/notifications'
import Cookies from 'js-cookie'
import { LoadingOverlay } from '@mantine/core'
import { useLoggedIn } from '@/components/loginContext'

function AuthCallback() {
  const { setLoggedIn } = useLoggedIn()
  const router = useRouter()
  const { query } = router
  const token = query.token

  useEffect(() => {
    if (token) {
      Cookies.set('authToken', String(token), {
        expires: 7,
        secure: true,
      })
      localStorage.setItem('loggedIn', 'true')
      setLoggedIn(true)
    }
    router.push('/').then(() => {
      showSuccess({
        action: 'ログイン',
      })
    })
  }, [token])

  return (
    <LoadingOverlay
      loaderProps={{ size: 'sm', color: 'gray', variant: 'bars' }}
      overlayProps={{ opacity: 0.3, color: '#c5c5c5' }}
      visible
    />
  )
}

export default AuthCallback
