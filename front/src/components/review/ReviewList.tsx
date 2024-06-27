import { useIdea } from '@/context/IdeaContext'
import { Flex, Text, Paper, Center, Button, Loader } from '@mantine/core'
import NextImage from 'next/image'
import { IconSend } from '@tabler/icons-react'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { useState } from 'react'
import { useAiReviewMutation } from '@/lib/generated/client'
import { showInfo, showError } from '@/components/showNotification'
import { useRouter } from 'next/router'

const reviewerItems: { [key: string]: { image: string; name: string } } = {
  positive: { image: '/img/angel.webp', name: '天使' },
  negative: { image: '/img/devil.webp', name: '悪魔' },
}

export const ReviewList = () => {
  const { reviews, userId, draft } = useIdea()
  const { id } = useRouter().query
  const { currentUser } = useCurrentUser()
  // TODO: Jobが完了したらrefetchするように修正
  const [aiReviewLoading, setAiReviewLoading] = useState(false)
  const [aiReviewMutation] = useAiReviewMutation({})

  const handleAiReview = async () => {
    setAiReviewLoading(true)

    try {
      const { data } = await aiReviewMutation({
        variables: { input: { ideaId: String(id) } },
      })

      if (data?.createAiReview?.success) {
        showInfo({
          title: `AIレビューを開始 | ${String(data?.createAiReview?.errors)}`,
          message: `時間を置いてリロードしてください`,
        })
      } else {
        showError({
          action: 'AIレビュー',
          message: String(data?.createAiReview?.errors),
        })
      }
    } catch (error) {
      showError({ action: 'AIレビュー', message: 'エラーが発生しました' })
    }
  }

  if (!draft && reviews?.length === 0 && currentUser?.id === userId) {
    return (
      <Center>
        <Flex gap={'lg'} align={'center'}>
          <NextImage
            src={reviewerItems['positive'].image}
            alt={reviewerItems['positive'].name}
            width={70}
            height={80}
          />
          <Button
            leftSection={
              aiReviewLoading ? <Loader size="xs" /> : <IconSend size={18} />
            }
            color="orange"
            onClick={handleAiReview}
            disabled={aiReviewLoading}
          >
            {aiReviewLoading ? 'AIレビュー実行中...' : 'AIレビューを試す'}
          </Button>
          <NextImage
            src={reviewerItems['negative'].image}
            alt={reviewerItems['negative'].name}
            width={70}
            height={80}
          />
        </Flex>
      </Center>
    )
  }

  return (
    <>
      {reviews?.map((review) => {
        const stance = review.stance ?? 'positive'
        return (
          <Flex key={review.id} align="flex-start" mb="md" gap="md">
            <Flex
              align="center"
              justify={'center'}
              direction="column"
              gap="sm"
              style={{ flex: 0 }}
              miw={85}
            >
              <NextImage
                src={reviewerItems[stance].image}
                alt={reviewerItems[stance].name}
                width={70}
                height={80}
              />
              <Text size="xs" color="dimmed">
                {`${reviewerItems[stance].name}のレビュー`}
              </Text>
            </Flex>
            <Paper p="sm" bg="gray.0" shadow="sm" radius="md" withBorder>
              <Text>{review.content}</Text>
            </Paper>
          </Flex>
        )
      })}
    </>
  )
}
