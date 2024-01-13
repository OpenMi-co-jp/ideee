import { useState, useEffect } from 'react'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { Container, Loader } from '@mantine/core'
import { EditForm } from '@/components/idea/form'
import { IdeaProvider } from '@/context/IdeaContext'
import { useGetIdeaQuery } from '@/lib/generated/client'
import { useRouter } from 'next/router'
import type { GetIdeaQuery } from '@/lib/generated/client'

const IdeaEdit = () => {
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
                  'linear-gradient(to bottom, transparent, white 0%, white 0%, transparent)',
                maskImage:
                  'linear-gradient(to right, transparent, white 2%, white 0%, transparent)',
              }),
        }}
      >
        <EditForm />
      </Container>
    </IdeaProvider>
  )
}

export default IdeaEdit
