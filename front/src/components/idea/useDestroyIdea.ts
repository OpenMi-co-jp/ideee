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
  const [destroyIdea] = useDestroyIdeaMutation()

  const handleDestroyIdea = (ideaId: string) => {
    destroyIdea({
      variables: {
        input: {
          id: ideaId as string,
        },
      },
    })
      .then(() => {
        showSuccess({ action: 'アイデア削除' })
        router.push('/')
      })
      .catch((error) => {
        showError({
          action: 'アイデア削除',
          message: error.message as string,
        })
      })
  }

  return {
    handleDestroyIdea,
  }
}
