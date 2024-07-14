import { useDestroyIdeaMutation } from '@/lib/generated/client'
import { useRouter } from 'next/router'
import { showSuccess, showError } from '../showNotification'

/**
 * CurrentUserのアイデアを削除するための関数
 * @param
 * @returns  アイデアを削除するための関数。
 */
export const useDestroyIdea = () => {
  const router = useRouter()
  const { id: ideaId } = router.query
  const [destroyIdea] = useDestroyIdeaMutation({
    variables: {
      input: {
        id: ideaId as string,
      },
    },
  })
  const handleDestroyIdea = () => {
    destroyIdea().then((res) => {
      if (res.data!.destroyIdea!.success) {
        showSuccess({ action: 'アイデア削除' })
        router.push('/')
      }
    })
  }

  return {
    handleDestroyIdea,
  }
}
