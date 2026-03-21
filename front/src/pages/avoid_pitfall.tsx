import { Container, Paper } from '@mantine/core'
import { SignPath } from '@/components/Auth/SignPath'
import { PreviewContent } from '@/components/avoidPitfall'
import { HiddenContent } from '@/components/avoidPitfall'
import { useCurrentUser } from '@/context/CurrentUserContext'
import classes from '@/styles/mask.module.css'
import { HeadBlock } from '@/pages-layout/Head'

function AvoidPitfall() {
  const { currentUser } = useCurrentUser()

  return (
    <>
      <HeadBlock
        pageTitle="個人開発の落とし穴を避ける"
        pageDescription="個人開発でよくある失敗パターンと、それを避けるためのヒントをご紹介します。"
        pagePath="https://ideee.tech/avoid_pitfall"
        pageKeywords="個人開発,落とし穴,失敗,回避,ヒント,注意点"
      />
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
    </>
  )
}

export default AvoidPitfall
