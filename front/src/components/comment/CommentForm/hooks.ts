import { showSuccess, showError } from '@/components/notifications'
import { useForm } from 'react-hook-form'
import type { CreateCommentInput } from '@/lib/generated/client'
import { useCreateCommentMutation } from '@/lib/generated/client'
import { useRouter } from 'next/router'
import { useCommentsInstance } from '@/components/comment/CommentList/useCommentsInstance'

export const useCommentAction = () => {
  const router = useRouter()
  const { id } = router.query
  const { refetch } = useCommentsInstance()
  const form = useForm<CreateCommentInput>({
    defaultValues: { description: '' },
    mode: 'onChange',
  })

  const [createCommentMutation, { data, loading, error }] =
    useCreateCommentMutation({})

  const onSubmit = async (props: CreateCommentInput) => {
    createCommentMutation({
      variables: {
        input: {
          description: props.description,
          ideaId: id as string,
        },
      },
    })
      .then((res) => {
        if (res.data?.createComment?.success) {
          showSuccess({ action: 'コメント作成' })
          refetch()
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
