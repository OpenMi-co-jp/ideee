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
import { AdBox } from '@/components/advertisement/AdBox'
import { RankList } from '@/components/user/ranking/RankList'
import { AffiliateBox } from '@/components/advertisement/AffiliateBox'
import { IdeaStats } from '@/components/features/IdeaStats'

export default function Home() {
  const { currentUser } = useCurrentUser()

  return (
    <>
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
          <AdBox />
          <PopularTags />
          <RankList />
          <AffiliateBox />
        </Grid.Col>
      </Grid>
      {!currentUser && <Philosophy />}
    </>
  )
}
