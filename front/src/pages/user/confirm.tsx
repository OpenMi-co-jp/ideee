import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { showSuccess } from '@/components/notifications'
import { LoadingOverlay } from '@mantine/core'

function Confirm() {
  const router = useRouter()

  useEffect(() => {
    router.push('/').then(() => {
      showSuccess({
        action: 'メールアドレスの確認',
        message: 'ログインしてください',
      })
    })
  }, [])

  return (
    <LoadingOverlay
      loaderProps={{ size: 'sm', color: 'gray', variant: 'bars' }}
      // overlayOpacity={0.3}
      // overlayColor="#c5c5c5"
      visible
    />
  )
}

export default Confirm
