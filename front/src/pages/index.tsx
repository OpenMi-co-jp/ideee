import { TopVision, Philosophy } from '@/components/features'
import { Space } from '@mantine/core'
import {
  HotIdeas,
  ActiveTeamIdeas,
  DeployedIdeas,
} from '@/components/idea/list'
import { PopularTags } from '@/components/tag'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { AiIdeaTitleSection } from '@/components/aiIdeaTitles'

export default function Home() {
  const { currentUser } = useCurrentUser()

  return (
    <>
      {!currentUser && <TopVision />}
      {!currentUser && <Space h="5rem" />}
      {currentUser && <AiIdeaTitleSection />}
      <Space h="lg" />
      <HotIdeas />
      <Space h="lg" />
      <PopularTags />
      <Space h="lg" />
      <ActiveTeamIdeas />
      <Space h="lg" />
      <DeployedIdeas />
      {!currentUser && <Philosophy />}
    </>
  )
}
