import { CommentAction } from '@/components/comment/CommentAction'
import { useComment } from '@/context/CommentContext'
import dayjs from '@/lib/format/dayjs'
import { TextWithLinks } from '@/utils/Text'
import { ActionIcon, Flex, Paper, Text } from '@mantine/core'
import { IconHeart } from '@tabler/icons-react'
import { useToggleLike } from '../like/useToggleLike'
import heartStyles from './heart.module.css'

export const CommentBody = ({ isCurrentUser }: { isCurrentUser: boolean }) => {
  const { comment } = useComment()
  const { description, createdAt } = comment

  const { isLike, toggleLike, addCount } = useToggleLike(
    Number(comment.id),
    'Comment'
  )

  const handleLike = () => {
    if (!isCurrentUser) {
      toggleLike()
    }
  }

  const commentCreatedAt = new Date(createdAt)

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
      {!isCurrentUser && (
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
              className={`${heartStyles['heartIcon']} ${
                isLike ? heartStyles['liked'] : ''
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
