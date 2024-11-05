import { CommentAction } from '@/components/comment/CommentAction'
import { useComment } from '@/context/CommentContext'
import dayjs from '@/lib/format/dayjs'
import { TextWithLinks } from '@/utils/Text'
import { ActionIcon, Flex, Group, Paper, Text } from '@mantine/core'
import { IconHeart } from '@tabler/icons-react'
import { useToggleLike } from '@/components/like/useToggleLike'
import heartStyle from '@/components/styles/heart.module.css'
import { useEffect, useState } from 'react'

export const CommentBody = ({ isCurrentUser }: { isCurrentUser: boolean }) => {
  const { comment } = useComment()
  const { description, createdAt } = comment
  const [likesCountState, setLikesCountState] = useState(comment.likesCount)

  const { isLike, toggleLike, addCount } = useToggleLike(
    Number(comment.id),
    'Comment'
  )

  useEffect(() => {
    setLikesCountState(comment.likesCount || 0)
  }, [comment])

  useEffect(() => {
    setLikesCountState((prev) => prev + addCount)
  }, [addCount])

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
        likesCountState > 0 && (
          <Flex align="center" justify="start">
            <Group
              p={3}
              c={hasLikes ? 'red' : 'gray'}
              gap="xs"
              style={{
                position: 'absolute',
                bottom: '5px',
                left: '5px',
                background: 'white',
                borderRadius: '5px',
                border: '1px solid #ced4da',
              }}
            >
              <IconHeart fill={hasLikes ? 'red' : 'gray'} />
              <Text c="gray" ml={5}>
                {comment.likesCount}
              </Text>
            </Group>
          </Flex>
        )
      ) : (
        <Flex align="center" justify="end">
          <ActionIcon
            onClick={handleLike}
            variant="default"
            w={'50px'}
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
            {likesCountState > 0 && (
              <Text c="gray" ml={5}>
                {likesCountState}
              </Text>
            )}
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
