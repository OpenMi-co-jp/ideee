import { useState, useEffect } from 'react'
import TopVision from '@/components/features/TopVision'
import GetPopularTags from '@/components/features/GetPopularTags'
import Philosophy from '@/components/features/Philosophy'
import GetActiveTeamIdeas from '@/components/features/GetActiveTeamIdeas'
import GetDeployedIdeas from '@/components/features/GetDeployedIdeas'
import GetHotIdeas from '@/components/features/GetHotIdeas'
import { useLoggedIn } from '@/components/loginContext'

export default function Home() {
  const { loggedIn } = useLoggedIn()
  const [LSLoggedIn, setLSLoggedIn] = useState(false)

  useEffect(() => {
    setLSLoggedIn(localStorage.getItem('loggedIn') === 'true')
  }, [])

  return (
    <>
      {(!LSLoggedIn || !loggedIn) && <TopVision />}
      <GetHotIdeas />
      <GetPopularTags />
      <GetActiveTeamIdeas />
      <GetDeployedIdeas />
      {(!LSLoggedIn || !loggedIn) && <Philosophy />}
    </>
  )
}
