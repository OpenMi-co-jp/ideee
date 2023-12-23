import { useDestroyIdeaMutation } from '@/lib/generated/client'
import { useRouter } from 'next/router'

/**
 * CurrentUserのアイデアを削除するための関数
 * @param {string} id - 削除するアイデアのID。
 * @returns  アイデアを削除するための関数。
 */
export const useDestroyIdea = (id: string) => {
  const router = useRouter()
  const [destroyIdea] = useDestroyIdeaMutation({
    variables: {
      input: {
        id: id,
      },
    },
  })
  const handleDestroyIdea = () => {
    destroyIdea().then(() => {
      router.push('/idea')
    })
  }

  return {
    handleDestroyIdea,
  }
}