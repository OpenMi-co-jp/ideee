import { TopVision, Philosophy } from '@/components/features'
import { Space, Grid } from '@mantine/core'
import {
  HotIdeas,
  ActiveTeamIdeas,
  DeployedIdeas,
} from '@/components/idea/list'
import { PopularTags } from '@/components/tag'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { AiIdeaTitleSection } from '@/components/aiIdeaTitles'
import { RankList } from '@/components/user/ranking/RankList'
import { AffiliateBox } from '@/components/advertisement/AffiliateBox'
import { IdeaStats } from '@/components/features/IdeaStats'
import { HeadBlock } from '@/pages-layout/Head'
import { generateWebSiteJsonLd } from '@/lib/seo/jsonLd'

export default function Home() {
  const { currentUser } = useCurrentUser()
  const websiteJsonLd = generateWebSiteJsonLd()

  return (
    <>
      <HeadBlock
        pageTitle="ホーム"
        pageDescription="ideeeはエンジニアとアイデアをつなぐマッチングプラットフォーム。あなたのアイデアを形にするエンジニアと出会えます。"
        pagePath="https://ideee.tech"
        pageKeywords="ideee,アイデア,エンジニア,マッチング,個人開発,チーム開発"
        jsonLd={websiteJsonLd}
      />
      {!currentUser && <TopVision />}
      {!currentUser && <Space h="5rem" />}
      <Grid gutter="lg">
        <Grid.Col span={{ base: 12, md: 9, lg: 9 }}>
          <HotIdeas />
          {currentUser && (
            <>
              <Space h="xs" />
              <AiIdeaTitleSection />
            </>
          )}
          <Space h="xs" />
          <ActiveTeamIdeas />
          <Space h="xs" />
          <DeployedIdeas />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 3, lg: 3 }}>
          <IdeaStats />

          {/* Sentryとの広告キャンペーンが終わったのでコメントアウト */}
          {/* <AdBox /> */}
          <PopularTags />
          <RankList />
          <AffiliateBox />
        </Grid.Col>
      </Grid>
      {!currentUser && <Philosophy />}
    </>
  )
}
