import { showSuccess, showError } from '@/components/notifications'
import { useForm } from 'react-hook-form'
import type { UpdateCommentInput } from '@/lib/generated/client'
import { useUpdateCommentMutation } from '@/lib/generated/client'
import { useCommentsInstance } from '@/components/comment/CommentList/useCommentsInstance'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useComment } from '@/context/CommentContext'

export const useCommentAction = () => {
  const { refetch } = useCommentsInstance()
  const commentSchema = z.object({
    description: z.string().min(1, { message: 'コメントを入力してください' }),
  })
  const { comment, setIsEditing } = useComment()
  const form = useForm<UpdateCommentInput>({
    defaultValues: { description: comment.description },
    resolver: zodResolver(commentSchema),
    mode: 'onChange',
  })

  const [updateCommentMutation, { data, loading, error }] =
    useUpdateCommentMutation({})

  const onSubmit = async (props: UpdateCommentInput) => {
    updateCommentMutation({
      variables: {
        input: {
          id: comment.id ?? '',
          description: props.description,
        },
      },
    })
      .then((res) => {
        if (res.data?.updateComment?.success) {
          setIsEditing(false)
          showSuccess({ action: 'コメント更新' })
          refetch()
          form.reset()
        }
      })
      .catch((error) => {
        console.log(error)
        showError({
          action: 'コメント更新',
          message: error.message as string,
        })
      })
  }

  return { form, onSubmit }
}
