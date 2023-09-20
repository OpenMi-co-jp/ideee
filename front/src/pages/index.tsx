import { useState, useEffect } from 'react'
import TopVision from '@/components/features/TopVision'
import GetPopularTags from '@/components/features/GetPopularTags'
import Philosophy from '@/components/features/Philosophy'
import GetActiveTeamIdeas from '@/components/features/GetActiveTeamIdeas'
import GetDeployedIdeas from '@/components/features/GetDeployedIdeas'
import GetHotIdeas from '@/components/features/GetHotIdeas'

export default function Home() {
  const [LSLoggedIn, setLSLoggedIn] = useState(false)

  useEffect(() => {
    setLSLoggedIn(localStorage.getItem('loggedIn') === 'true')
  }, [])

  return (
    <>
      {!LSLoggedIn && <TopVision />}
      <GetHotIdeas />
      <GetPopularTags />
      <GetActiveTeamIdeas />
      <GetDeployedIdeas />
      {!LSLoggedIn && <Philosophy />}
    </>
  )
}
