import { SignPath } from '@/components/Auth/SignPath'
import { IdeaTagList, IdeaTitle, UserSection } from '@/components/idea'
import { HiddenIdeaContent, IdeaContents } from '@/components/idea/show'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { IdeaProvider } from '@/context/IdeaContext'
import type { GetIdeaQuery } from '@/lib/generated/client'
import { useGetIdeaQuery } from '@/lib/generated/client'
import { Container, Loader } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

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
                  'linear-gradient(to bottom, transparent, white 0%, white 3%, transparent)',
                maskImage:
                  'linear-gradient(to bottom, transparent, white 0%, white 3%, transparent)',
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
