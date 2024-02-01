import { Container, Paper } from '@mantine/core'
import { SignPath } from '@/components/Auth/SignPath'
import { PreviewContent } from '@/components/avoidPitfall'
import { HiddenContent } from '@/components/avoidPitfall'
import { useCurrentUser } from '@/context/CurrentUserContext'
import classes from '@/styles/mask.module.css'

function AvoidPitfall() {
  const { currentUser } = useCurrentUser()

  return (
    <Container>
      <Paper p="xl" shadow="xl">
        <Container
          className={currentUser ? classes.container : `${classes.maskImage}`}
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
