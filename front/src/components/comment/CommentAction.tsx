import { ActionMenu } from '@/components/action/Menu'
import { GetCommentQuery } from '@/lib/generated/client'
import { showSuccess, showError } from '../notifications'
import { useDestroyCommentMutation } from '@/lib/generated/client'
import { useCommentsInstance } from '@/components/comment/CommentList/useCommentsInstance'

export const CommentAction = ({ comment }: GetCommentQuery) => {
  const [destroyComment] = useDestroyCommentMutation({
    variables: {
      input: {
        id: comment?.id ?? '',
      },
    },
  })
  const { refetch } = useCommentsInstance()

  const handleDestroyComment = () => {
    destroyComment()
      .then(() => {
        showSuccess({ action: 'コメント削除' })
        refetch()
      })
      .catch((error) => {
        showError({
          action: 'コメント削除',
          message: error.message as string,
        })
      })
  }

  return (
    <ActionMenu
      title="コメント管理"
      onEdit={() => {
        console.log('edit', comment.id)
      }}
      onDelete={() => {
        handleDestroyComment()
      }}
    />
  )
}
