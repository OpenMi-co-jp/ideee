import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateIdeaMutation } from '@/lib/generated/client'
import { showSuccess, showError } from '@/components/showNotification'
import { useRouter } from 'next/router'
import { useGetIdea } from '@/utils/hooks/useGetIdea'
import { IdeaFormSchema } from '../IdeaFormSchema'

export const UseCreateIdea = () => {
  const form = useForm({
    resolver: zodResolver(IdeaFormSchema),
    mode: 'onChange',
    defaultValues: {
      stance: 'free_right',
    },
  })
  const [createIdeaMutation] = useCreateIdeaMutation()
  const router = useRouter()
  const { refetch } = useGetIdea()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await createIdeaMutation({
        variables: {
          input: {
            name: data.name,
            background: data.background,
            goal: data.goal,
            issue: data.issue,
            hypothesis: data.hypothesis,
            monetize: data.monetize,
            similar: data.similar,
            stance: data.stance,
            target: data.target,
            wishFunction: data.wishFunction,
            githubUrl: data.githubUrl,
            productUrl: data.productUrl,
            publish: data.publish,
            icon: data.icon,
            tagList: data.tagList,
          },
        },
      })
      if (response.data?.createIdea?.success) {
        showSuccess({ action: 'アイデアの作成' })
        refetch()
        router.push(`/ideas/${response.data.createIdea.idea?.id}`)
      } else {
        showError({
          action: 'アイデアの作成',
          message: String(response.data?.createIdea?.errors),
        })
      }
    } catch (err: any) {
      showError({
        action: 'アイデアの作成',
        message: err.message as string,
      })
    }
  }

  return { onSubmit, form }
}
