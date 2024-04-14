import { useState, useEffect } from 'react'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { Loader } from '@mantine/core'
import { EditForm } from '@/components/idea/form'
import { IdeaProvider } from '@/context/IdeaContext'
import { useGetIdea } from '@/utils/hooks/useGetIdea'
import type { GetIdeaQuery } from '@/lib/generated/client'
import { showError } from '@/components/showNotification'
import { useRouter } from 'next/router'

const IdeaEdit = () => {
  const { currentUser } = useCurrentUser()
  const { data, loading, error } = useGetIdea()
  const [idea, setIdea] = useState({})
  const router = useRouter()

  useEffect(() => {
    if (!currentUser) {
      showError({ action: 'アイデアの編集', message: 'ログインしてください' })
      router.push('/')
      return
    }

    if (data && data.idea.user.id !== String(currentUser.id)) {
      showError({
        action: 'アイデアの編集',
        message: '他人のアイデアは編集できません',
      })
      router.push('/')
      return
    }

    if (data) {
      setIdea(data.idea)
    }
  }, [currentUser, data, router])

  if (loading) return <Loader color="yellow" />

  return (
    <IdeaProvider idea={idea as GetIdeaQuery['idea']}>
      <EditForm />
    </IdeaProvider>
  )
}

export default IdeaEdit
