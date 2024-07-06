import { useIdea } from '@/context/IdeaContext'
import { Center, Button, Loader } from '@mantine/core'
import { IconSend } from '@tabler/icons-react'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { useState } from 'react'
import { showInfo, showError } from '@/components/showNotification'
import { useAiBrushUpMutation } from '@/lib/generated/client'

export const AiBrushUp = () => {
  const { id } = useIdea()
  const { currentUser } = useCurrentUser()
  // TODO: Jobが完了したらrefetchするように修正
  const [aiBrushUpLoading, setAiBrushUpLoading] = useState(false)
  const [aiBrushUpMutation] = useAiBrushUpMutation({})

  const handleAiBrushUp = async () => {
    setAiBrushUpLoading(true)

    try {
      const { data } = await aiBrushUpMutation({
        variables: {
          input: {
            ideaId: id,
          },
        },
      })

      if (data?.createAiBrushUp?.success) {
        showInfo({
          title: `AIブラッシュアップを開始 | ${String(
            data?.createAiBrushUp?.errors
          )}`,
          message: '時間を置いてリロードしてください',
        })
      } else {
        showError({
          action: 'AIブラシアップ',
          message: String(data?.createAiBrushUp?.errors),
        })
      }
    } catch (error) {
      showError({ action: 'AIブラシアップ', message: 'エラーが発生しました' })
    }

    setAiBrushUpLoading(false)
  }

  if (!idea.draft && currentUser?.id === idea.userId) {
    return (
      <Center my={30}>
        <Button
          type="submit"
          leftSection={
            aiBrushUpLoading ? <Loader size="xs" /> : <IconSend size={18} />
          }
          color="orange"
          onClick={handleAiBrushUp}
          disabled={aiBrushUpLoading}
        >
          {aiBrushUpLoading
            ? 'AIブラッシュアップ実行中...'
            : 'AIブラッシュアップを試す'}
        </Button>
      </Center>
    )
  }

  return null
}
