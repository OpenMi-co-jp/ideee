import { Container, Paper } from '@mantine/core'
import { useLoggedIn } from '@/components/loginContext'
import { SignPath } from '@/components/Auth/SignPath'
import { PreviewContent } from '@/components/avoidPitfall'
import { HiddenContent } from '@/components/avoidPitfall'

function AvoidPitfall() {
  const { loggedIn } = useLoggedIn()

  return (
    <Container>
      <Paper p="xl" shadow="xl">
        <Container
          style={{
            height: '100%',
            ...(!loggedIn
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
          if (loggedIn) {
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
