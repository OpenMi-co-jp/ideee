import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Image, Title, Group, Button, Loader } from '@mantine/core'
import { UserIcon, AccompaniedTags, IdeaContent } from '@/components/idea'
import { useLoggedIn } from '@/components/loginContext'
import { useGetIdeaQuery } from '@/lib/generated/client'

const IdeaDetail = () => {
  const router = useRouter()
  const { data, loading, error } = useGetIdeaQuery({
    variables: {
      id: router.query.id as string,
    },
  })
  const { loggedIn } = useLoggedIn()
  const [LSLoggedIn, setLSLoggedIn] = useState(false)

  useEffect(() => {
    setLSLoggedIn(localStorage.getItem('loggedIn') === 'true')
  }, [])

  if (loading) return <Loader color='yellow' />
  const idea = data?.idea

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
        <Title>{idea?.name}</Title>
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
