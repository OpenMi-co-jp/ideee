import { UserIcon } from '@/components/user'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { Flex, Group, Text } from '@mantine/core'
import Link from 'next/link'

export const RoomComment = () => {
  const { currentUser } = useCurrentUser()
  // ルームのコメントのContextでコメント内容を取得
  // const userContents = [
  //   <UserIcon key="icon" userIcon={user.image} />,
  //   <Text key="name">{user.name}</Text>,
  // ]

  return (
    // <Flex
    //   p="xs"
    //   direction="column"
    //   wrap={currentUser ? 'wrap' : 'wrap-reverse'}
    // >
    //   <Flex justify={isCurrentUser ? 'flex-end' : 'flex-start'}>
    //     <Flex direction="column">
    //       <Link href={`/users/${user.id}`} passHref>
    //         <Group justify={isCurrentUser ? 'flex-end' : 'flex-start'} gap="xs">
    //           {isCurrentUser ? userContents.reverse() : userContents}
    //         </Group>
    //       </Link>
    //       {isEditing ? (
    //<RoomCommentEditForm/>
    //       ) : (
    //         <RoomCommentBody isCurrentUser={isCurrentUser} />
    //       )}
    //     </Flex>
    //   </Flex>
    // </Flex>

    <div></div>
  )
}
