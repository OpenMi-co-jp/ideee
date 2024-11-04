import { CommentAction } from '@/components/comment/CommentAction'
import { useComment } from '@/context/CommentContext'
import dayjs from '@/lib/format/dayjs'
import { TextWithLinks } from '@/utils/Text'
import { ActionIcon, Flex, Group, Paper, Text } from '@mantine/core'
import { IconHeart } from '@tabler/icons-react'
import { useToggleLike } from '@/components/like/useToggleLike'
import heartStyle from '@/components/styles/heart.module.css'

export const CommentBody = ({ isCurrentUser }: { isCurrentUser: boolean }) => {
  const { comment } = useComment()
  const { description, createdAt } = comment

  const { isLike, toggleLike, addCount } = useToggleLike(
    Number(comment.id),
    'Comment'
  )

  const handleLike = () => {
    toggleLike()
  }

  const commentCreatedAt = new Date(createdAt)

  const hasLikes = comment.likesCount > 0

  return (
    <div style={{ position: 'relative' }}>
      <Paper
        bg="#FFFFFF"
        miw="15rem"
        maw="30rem"
        p="md"
        mt="3px"
        radius="lg"
        style={{
          wordWrap: 'break-word',
          wordBreak: 'break-word',
        }}
      >
        <TextWithLinks>{description}</TextWithLinks>
      </Paper>
      {isCurrentUser ? (
        <Flex align="center" justify="start">
          <Group
            p={2}
            c={hasLikes ? 'red' : 'gray'}
            style={{
              position: 'absolute',
              bottom: '5px',
              left: '5px',
              background: 'white',
              borderRadius: '5px',
              border: '1px solid #ced4da',
            }}
          >
            <IconHeart
              fill={hasLikes ? 'red' : 'gray'}
              className={`${heartStyle.heartIcon} ${
                hasLikes ? heartStyle.liked : ''
              }`}
            />
            <Text c="gray">{comment.likesCount}</Text>
          </Group>
        </Flex>
      ) : (
        <Flex align="center" justify="end">
          <ActionIcon
            onClick={handleLike}
            variant="default"
            w={'40px'}
            h={'30px'}
            p={2}
            c={isLike ? 'red' : 'gray'}
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '5px',
            }}
          >
            <IconHeart
              fill={isLike ? 'red' : 'gray'}
              className={`${heartStyle.heartIcon} ${
                isLike ? heartStyle.liked : ''
              }`}
            />
          </ActionIcon>
        </Flex>
      )}
      <Flex justify={isCurrentUser ? 'flex-end' : 'flex-start'}>
        <Text c="gray" mx="xs">
          {dayjs(commentCreatedAt).format('YYYY-MM-DD HH:mm')}
        </Text>
        {isCurrentUser && <CommentAction />}
      </Flex>
    </div>
  )
}
