import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '@/lib/analytics/gtag'
import { LOGIN_URL, SIGNUP_URL } from '../constant'

export const useHandleRouteChange = () => {
  const router = useRouter()

  useEffect(() => {
    const handleRouterChange = (url: any) => {
      gtag.pageview(url)
      const currentUser = localStorage.getItem('currentUser')
      if (
        !currentUser &&
        url !== LOGIN_URL &&
        url !== SIGNUP_URL
      ) {
        sessionStorage.setItem('previousPage', url || '/')
      }
    }
    router.events.on('routeChangeComplete', handleRouterChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouterChange)
    }
  }, [router.events])
}
