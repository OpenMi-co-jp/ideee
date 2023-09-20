import { useState, useEffect } from 'react'
import { Inter } from 'next/font/google'
import testQuery from '@/components/test'
import TopVision from '@/components/features/TopVision'
import GetPopularTags from '@/components/features/GetPopularTags'
import Philosophy from '@/components/features/Philosophy'
import GetActiveTeamIdeas from '@/components/features/GetActiveTeamIdeas'
import GetDeployedIdeas from '@/components/features/GetDeployedIdeas'
import GetHotIdeas from '@/components/features/GetHotIdeas'
import { Loader } from '@mantine/core'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data, loading } = testQuery()
  const [LSLoggedIn, setLSLoggedIn] = useState(false)

  useEffect(() => {
    setLSLoggedIn(localStorage.getItem('loggedIn') === 'true')
  }, [])
  if (loading) return <Loader color="yellow" />

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
