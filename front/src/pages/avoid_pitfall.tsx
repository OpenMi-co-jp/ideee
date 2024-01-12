import { Container, Paper } from '@mantine/core'
import { SignPath } from '@/components/Auth/SignPath'
import { PreviewContent } from '@/components/avoidPitfall'
import { HiddenContent } from '@/components/avoidPitfall'
import { useCurrentUser } from '@/context/CurrentUserContext'

function AvoidPitfall() {
  const { currentUser } = useCurrentUser()

  return (
    <Container>
      <Paper p="xl" shadow="xl">
        <Container
          style={{
            height: '100%',
            ...(!currentUser
              ? {
                  WebkitMaskImage:
                  'linear-gradient(to bottom, transparent, white 0%, white 3%, transparent)',
                  maskImage:
                  'linear-gradient(to bottom, transparent, white 0%, white 3%, transparent)',
                }
              : {}),
          }}
        >
          <PreviewContent />
        </Container>

        {(() => {
          if (currentUser) {
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
