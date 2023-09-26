import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Image, Title, Group, Button } from '@mantine/core'
import { UserIcon, AccompaniedTags, IdeaContent } from './'
import { useLoggedIn } from '@/components/loginContext'

const IdeaDetail = () => {
  const router = useRouter()

  const { loggedIn } = useLoggedIn()
  const [LSLoggedIn, setLSLoggedIn] = useState(false)

  const { id } = router.query
  useEffect(() => {
    setLSLoggedIn(localStorage.getItem('loggedIn') === 'true')
  }, [])

  return (
    <>
      {(LSLoggedIn || loggedIn) && 'ログイン中'}
      <Group position="center">
        <Image
          height={50}
          width={50}
          radius={50}
          // src={iconRef}
          alt="user prof"
        />
        <Title> Idea of title can be very large</Title>
      </Group>
      <UserIcon />
      <AccompaniedTags />
      <IdeaContent />
      <Group position="center">
        <Button type="submit" size="lg">
          送信
        </Button>
      </Group>
    </>
  )
}

export default IdeaDetail
