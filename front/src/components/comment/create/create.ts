import { showSuccess, showError } from '@/components/showNotification'
import { useForm } from 'react-hook-form'
import type { CreateCommentInput } from '@/lib/generated/client'
import { useCreateCommentMutation } from '@/lib/generated/client'
import { useCommentsInstance } from '@/components/comment/CommentList/useCommentsInstance'
import { useIdea } from '@/context/IdeaContext'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const useCommentAction = () => {
  const idea = useIdea()
  const { refetch } = useCommentsInstance()
  const commentSchema = z.object({
    description: z.string().min(1, { message: 'コメントを入力してください' }),
  })
  const form = useForm<CreateCommentInput>({
    defaultValues: { description: '' },
    resolver: zodResolver(commentSchema),
    mode: 'onChange',
  })

  const [createCommentMutation, { data, loading, error }] =
    useCreateCommentMutation({})

  const onSubmit = async (props: CreateCommentInput) => {
    createCommentMutation({
      variables: {
        input: {
          description: props.description,
          ideaId: idea.id,
        },
      },
    })
      .then((res) => {
        if (res.data?.createComment?.success) {
          showSuccess({ action: 'コメント作成' })
          refetch()
          form.reset()
        }
      })
      .catch((error) => {
        console.log(error)
        showError({
          action: 'コメント作成',
          message: error.message as string,
        })
      })
  }

  return { form, onSubmit }
}
