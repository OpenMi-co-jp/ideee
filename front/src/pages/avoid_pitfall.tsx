import { useState, useEffect } from 'react'
import { Container, Paper } from '@mantine/core'
import { useLoggedIn } from '@/components/loginContext'
import { SignPath } from '@/components/Auth/SignPath'
import { PreviewContent } from '@/components/avoidPitfall'
import { HiddenContent } from '@/components/avoidPitfall'

function AvoidPitfall() {
  const { loggedIn } = useLoggedIn()
  const [LSLoggedIn, setLSLoggedIn] = useState(false)
  useEffect(() => {
    try {
      setLSLoggedIn(localStorage.getItem('loggedIn') === 'true')
    } catch (e) {
      console.error(e)
    }
  }, [])

  return (
    <Container>
      <Paper p="xl" shadow="xl">
        <Container
          style={{
            height: '100%',
            ...(!(loggedIn || LSLoggedIn)
              ? {
                  WebkitMaskImage:
                    'linear-gradient(to bottom, transparent, white 0%, white 0%, transparent)',
                  maskImage:
                    'linear-gradient(to right, transparent, white 2%, white 0%, transparent)',
                }
              : {}),
          }}
        >
          <PreviewContent />
        </Container>

        {(() => {
          if (loggedIn || LSLoggedIn) {
            return <HiddenContent />
          } else {
            return <SignPath />
          }
        })()}
      </Paper>
    </Container>
  )
}

export default AvoidPitfall
