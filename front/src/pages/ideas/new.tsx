import { useEffect } from 'react'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { CreateForm } from '@/components/idea/form'
import { showError } from '@/components/showNotification'
import { useRouter } from 'next/router'

const IdeaCreate = () => {
  const { currentUser } = useCurrentUser()
  const router = useRouter()

  useEffect(() => {
    if (!currentUser) {
      showError({ action: 'アイデアの作成', message: 'ログインしてください' })
      router.push('/')
      return
    }
  }, [currentUser, router])

  return <CreateForm />
}

export default IdeaCreate
