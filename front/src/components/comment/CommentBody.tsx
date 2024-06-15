import { Text, Paper, Flex, ActionIcon } from '@mantine/core'
import { TextWithLinks } from '@/utils/Text'
import { CommentAction } from '@/components/comment/CommentAction'
import { useComment } from '@/context/CommentContext'
import dayjs from '@/lib/format/dayjs'
import { IconHeart } from '@tabler/icons-react'
import { useState } from 'react'

export const CommentBody = ({ isCurrentUser }: { isCurrentUser: boolean }) => {
  const { comment } = useComment()
  const { description, createdAt, user } = comment

  // TODO　コメントに対するLIKEを取得する。
  const likes = 0
  const [likeCount, setLikeCount] = useState(likes || 0)
  const [liked, setLiked] = useState(false)

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
    // ここにサーバーにlike状態を送信するコードを追加
  }
  const commentCreatedAt = new Date(createdAt)

  return (
    <div style={{ position: 'relative' }}>
      <Paper
        bg="#FFFFFF"
        maw="30rem"
        p="md"
        mt="3px"
        mb="15px"
        radius="lg"
        style={{
          wordWrap: 'break-word',
          wordBreak: 'break-word',
        }}
      >
        <TextWithLinks>{description}</TextWithLinks>
      </Paper>
      <Flex align="center" justify="end">
        <ActionIcon
          onClick={handleLike}
          variant="default"
          w={'40px'}
          h={'30px'}
          p={2}
          c={liked ? 'red' : 'gray'}
          style={{
            position: 'absolute',
            bottom: '25px',
            right: '5px',
          }}
        >
          <IconHeart fill={liked ? 'red' : 'gray'} />
          <Text ml="5px" c={'gray'}>
            {likeCount}
          </Text>
        </ActionIcon>
      </Flex>
      <Flex justify={isCurrentUser ? 'flex-end' : 'flex-start'}>
        <Text c="gray" mx="xs">
          {dayjs(commentCreatedAt).format('YYYY-MM-DD HH:mm')}
        </Text>
        {isCurrentUser && <CommentAction />}
      </Flex>
    </div>
  )
}
