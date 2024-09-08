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
      <HotIdeas />
      {currentUser && (
        <>
          <Space h="xs" />
          <AiIdeaTitleSection />
        </>
      )}
      <Space h="xs" />
      <PopularTags />
      <Space h="xs" />
      <ActiveTeamIdeas />
      <Space h="xs" />
      <DeployedIdeas />
      {!currentUser && <Philosophy />}
    </>
  )
}
