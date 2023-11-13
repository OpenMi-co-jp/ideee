import { useState, useEffect } from 'react'
import { TopVision, Philosophy } from '@/components/features'
import { Space } from '@mantine/core'
import { HotIdeas, ActiveTeamIdeas, DeployedIdeas } from '@/components/idea'
import { PopularTags } from '@/components/tag'
import { useLoggedIn } from '@/components/loginContext'

export default function Home() {
  const { loggedIn } = useLoggedIn()
  const [LSLoggedIn, setLSLoggedIn] = useState(false)

  useEffect(() => {
    try {
      setLSLoggedIn(localStorage.getItem('loggedIn') === 'true')
    } catch (e) {
      console.error(e)
    }
  }, [])

  return (
    <>
      {!(LSLoggedIn || loggedIn) && <TopVision />}
      <Space h="10rem" />
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
