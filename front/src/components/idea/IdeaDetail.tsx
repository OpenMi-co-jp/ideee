import { useRouter } from 'next/router'
import { Image, Title, Group, Button } from '@mantine/core'
import { UserIcon, AccompaniedTags, IdeaContent } from './'

const IdeaDetail = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Group>
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
