import { Container, Space } from '@mantine/core'
import { useCurrentUser } from '@/context/CurrentUserContext'
import {
  Introduction,
  Merits,
  Description,
  SignInInvitation,
} from '@/components/about'
import { ColorsComponent } from '@/components/footDesignComponent/colorsComponent'
import { HeadBlock } from '@/pages-layout/Head'

function AboutPage() {
  const { currentUser } = useCurrentUser()

  return (
    <>
      <HeadBlock
        pageTitle="ideeeとは"
        pageDescription="ideeeはエンジニアとアイデアをつなぐマッチングプラットフォームです。あなたのアイデアを形にするエンジニアと出会えます。"
        pagePath="https://ideee.tech/about"
        pageKeywords="ideee,アイデア,エンジニア,マッチング,プラットフォーム,サービス紹介"
      />
      <Container my="6rem">
      <Introduction />
      <Space my="4rem" />
      <Merits />
      <Description />

      {!currentUser && <SignInInvitation />}

      <ColorsComponent />
      </Container>
    </>
  )
}

export default AboutPage
