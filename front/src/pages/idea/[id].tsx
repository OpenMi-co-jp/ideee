import { useState, useEffect } from 'react'
import { useLoggedIn } from '@/components/loginContext'
import { IdeaPage, PreviewIdeaPage } from '@/components/idea'
import { Container } from '@mantine/core'
import { SignPath } from '@/components/Auth/SignPath'
import { PreviewContent } from '@/components/avoidPitfall'

const IdeaDetail = () => {
  const { loggedIn } = useLoggedIn()
  const [LSLoggedIn, setLSLoggedIn] = useState(false)

  useEffect(() => {
    setLSLoggedIn(localStorage.getItem('loggedIn') === 'true')
  }, [])

  return (
    <>
      {LSLoggedIn || loggedIn ? (
        <IdeaPage />
      ) : (
        <>
          <Container
            style={{
              height: '100%',
              WebkitMaskImage:
                'linear-gradient(to bottom, transparent, white 0%, white 0%, transparent)',
              maskImage:
                'linear-gradient(to right, transparent, white 2%, white 0%, transparent)',
            }}
          >
            <PreviewIdeaPage />
          </Container>
          <SignPath />
        </>
      )}
    </>
  )
}

export default IdeaDetail
