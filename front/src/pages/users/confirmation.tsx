import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { showSuccess } from '@/components/showNotification'
import { LoadingOverlay } from '@mantine/core'

function Confirmation() {
  const router = useRouter()

  useEffect(() => {
    router.push('/').then(() => {
      showSuccess({
        action: 'メールアドレスの確認',
        message: 'ログインしてください',
      })
    })
  }, [router])

  return (
    <LoadingOverlay
      loaderProps={{ size: 'sm', color: 'gray', variant: 'bars' }}
      overlayProps={{
        opacity: 0.3,
        color: '#c5c5c5',
      }}
      visible
    />
  )
}

export default Confirmation
