import { useState, useEffect } from 'react'
import { useLoggedIn } from '@/components/loginContext'
import { HiddenIdeaContent } from '@/components/idea/show'
import { Container } from '@mantine/core'
import { SignPath } from '@/components/Auth/SignPath'
import { UserSection, IdeaTagList, IdeaTitle } from '@/components/idea'

const IdeaDetail = () => {
  const { loggedIn } = useLoggedIn()
  const [LSLoggedIn, setLSLoggedIn] = useState(false)

  useEffect(() => {
    setLSLoggedIn(localStorage.getItem('loggedIn') === 'true')
  }, [])

  return (
    <>
      <Container
        style={{
          height: '100%',
          ...(loggedIn || LSLoggedIn
            ? {}
            : {
                WebkitMaskImage:
                  'linear-gradient(to bottom, transparent, white 0%, white 0%, transparent)',
                maskImage:
                  'linear-gradient(to right, transparent, white 2%, white 0%, transparent)',
              }),
        }}
      >
        <IdeaTitle />
        <UserSection />
        <IdeaTagList />
      </Container>

      {(() => {
        if (loggedIn || LSLoggedIn) {
          return <HiddenIdeaContent />
        } else {
          return <SignPath />
        }
      })()}
    </>
  )
}

export default IdeaDetail
