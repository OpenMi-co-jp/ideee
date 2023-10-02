import { useState, useEffect } from 'react'
import { Group, Button } from '@mantine/core'
import {
  UserIcon,
  AccompaniedTagList,
  IdeaTitle,
  IdeaContent,
  CommentList,
} from '@/components/idea'
import { useLoggedIn } from '@/components/loginContext'

const IdeaDetail = () => {
  const { loggedIn } = useLoggedIn()
  const [LSLoggedIn, setLSLoggedIn] = useState(false)

  useEffect(() => {
    setLSLoggedIn(localStorage.getItem('loggedIn') === 'true')
  }, [])

  return (
    <>
      {(LSLoggedIn || loggedIn) && (
        <>
          <IdeaTitle />
          <UserIcon />
          <AccompaniedTagList />
          <IdeaContent />
          <CommentList />
          <Group position="center">
            <Button type="submit" size="lg" bg="#EAAE59">
              送信
            </Button>
          </Group>
        </>
      )}
    </>
  )
}

export default IdeaDetail
