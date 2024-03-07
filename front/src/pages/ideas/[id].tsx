import { SignPath } from '@/components/Auth/SignPath'
import { IdeaTagList, IdeaTitle, UserSection } from '@/components/idea'
import { HiddenIdeaContent, IdeaContents } from '@/components/idea/show'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { IdeaProvider } from '@/context/IdeaContext'
import { useGetIdea } from '@/utils/hooks/useGetIdea'
import type { GetIdeaQuery } from '@/lib/generated/client'
import { Container, Loader } from '@mantine/core'
import { useEffect, useState } from 'react'
import classes from '@/styles/mask.module.css'
import { showError } from '@/components/notifications'
import { useRouter } from 'next/router'

const IdeaDetail = () => {
  const { currentUser } = useCurrentUser()
  const { data, loading, error } = useGetIdea()
  const router = useRouter()
  const [idea, setIdea] = useState({})

  useEffect(() => {
    if (error) {
      showError({ action: 'アイデアの表示', message: error.message })
      router.push('/')
      return
    }

    if (data) {
      setIdea(data?.idea)
    }
  }, [data, error])

  if (loading) return <Loader color="yellow" />

  return (
    <IdeaProvider idea={idea as GetIdeaQuery['idea']}>
      <Container
        className={currentUser ? classes.container : `${classes.maskImage}`}
      >
        <IdeaTitle />
        <UserSection />
        <IdeaTagList />
        {!currentUser && <IdeaContents />}
      </Container>

      {(() => {
        if (currentUser) {
          return <HiddenIdeaContent />
        } else {
          return <SignPath />
        }
      })()}
    </IdeaProvider>
  )
}

export default IdeaDetail
