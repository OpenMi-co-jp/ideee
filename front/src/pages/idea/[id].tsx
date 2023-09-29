import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Image, Title, Group, Button, Loader } from '@mantine/core'
import { UserIcon, AccompaniedTags, IdeaContent } from '@/components/idea'
import { useLoggedIn } from '@/components/loginContext'
import { useGetIdeaQuery, } from '@/lib/generated/client'

const IdeaDetail = () => {
  const router = useRouter()

  const { loggedIn } = useLoggedIn()
  const [LSLoggedIn, setLSLoggedIn] = useState(false)

  const { data, loading, error } = useGetIdeaQuery({
    variables: {
      id: router.query.id as string,
    },
  })

  if (loading) return <Loader color='yellow' />

  useEffect(() => {
    setLSLoggedIn(localStorage.getItem('loggedIn') === 'true')
  }, [])

  return (
    <>
      {(LSLoggedIn || loggedIn) && (
        <>
          <Group position="center">
            <Image
              height={50}
              width={50}
              radius={50}
              src={data?.idea.icon}
              alt="user prof"
            />
            <Title>{data?.idea.name}</Title>
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
      )}
    </>
  )
}

export default IdeaDetail
