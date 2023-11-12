import { Text } from '@mantine/core'
import { useUser } from '@/context/userProfileContext'

export default function UserDescription() {
  const user = useUser()
  const description = user?.description
  return (
    <>
      <Text p="sm">{description ? description : '自己紹介が未入力です'}</Text>
    </>
  )
}
