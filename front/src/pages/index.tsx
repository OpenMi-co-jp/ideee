import { useState, useEffect } from 'react'
import { TopVision, Philosophy } from '@/components/features'
import { Space } from '@mantine/core'
import { HotIdeas, ActiveTeamIdeas, DeployedIdeas } from '@/components/ideas'
import { PopularTags } from '@/components/tag'
import { useLoggedIn } from '@/components/loginContext'

export default function Home() {
  const { loggedIn } = useLoggedIn()
  const [LSLoggedIn, setLSLoggedIn] = useState(false)

  useEffect(() => {
    setLSLoggedIn(localStorage.getItem('loggedIn') === 'true')
  }, [])

  return (
    <>
      {!(LSLoggedIn || loggedIn) && <TopVision />}
      <Space h="3rem" />
      <HotIdeas />
      <Space h="lg" />
      <PopularTags />
      <Space h="lg" />
      <ActiveTeamIdeas />
      <Space h="xl" />
      <DeployedIdeas />
      {!(LSLoggedIn || loggedIn) && <Philosophy />}
    </>
  )
}
