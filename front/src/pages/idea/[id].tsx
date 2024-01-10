import { useState, useEffect } from 'react'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { HiddenIdeaContent, IdeaContents } from '@/components/idea/show'
import { Container, Loader } from '@mantine/core'
import { SignPath } from '@/components/Auth/SignPath'
import { UserSection, IdeaTagList, IdeaTitle } from '@/components/idea'
import { IdeaProvider } from '@/context/IdeaContext'
import { useGetIdeaQuery } from '@/lib/generated/client'
import { useRouter } from 'next/router'
import type { GetIdeaQuery } from '@/lib/generated/client'

const IdeaDetail = () => {
  const { currentUser } = useCurrentUser()
  const router = useRouter()
  const { id } = router.query
  const { data, loading, error } = useGetIdeaQuery({
    variables: {
      id: id as string,
    },
  })

  const [idea, setIdea] = useState({})

  useEffect(() => {
    if (data) {
      setIdea(data?.idea)
    }
  }, [data])

  if (loading) return <Loader color="yellow" />

  return (
    <IdeaProvider idea={idea as GetIdeaQuery['idea']}>
      <Container
        style={{
          height: '100%',
          ...(currentUser
            ? {}
            : {
                WebkitMaskImage:
                  'linear-gradient(to bottom, transparent, white 0%, white 30%, transparent)',
                maskImage:
                  'linear-gradient(to right, transparent, white 2%, white 70%, transparent)',
              }),
        }}
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
