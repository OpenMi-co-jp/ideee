import { ActionMenu } from '@/components/action/Menu'
import { showSuccess, showError } from '../showNotification'
import { useDestroyCommentMutation } from '@/lib/generated/client'
import { useCommentsInstance } from '@/components/comment/CommentList/useCommentsInstance'
import { useComment } from '@/context/CommentContext'

export const CommentAction = () => {
  const { comment, setIsEditing } = useComment()
  const [destroyComment] = useDestroyCommentMutation({
    variables: {
      input: {
        id: comment?.id ?? '',
      },
    },
  })
  const { refetch } = useCommentsInstance()

  const handleDestroyComment = () => {
    if (!comment?.id) {
      showError({
        action: 'コメント削除',
        message: 'コメントIDが見つかりません。',
      })
      return
    }

    destroyComment().then((response) => {
      if (response.data!.destroyComment!.success) {
        showSuccess({ action: 'コメント削除' })
        refetch()
      } else {
        showError({
          action: 'コメント削除',
          message: String(response.data!.destroyComment!.errors),
        })
      }
    })
  }

  return (
    <ActionMenu
      title="コメント管理"
      onEdit={() => {
        setIsEditing(true)
      }}
      onDelete={() => {
        handleDestroyComment()
      }}
    />
  )
}
