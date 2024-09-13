import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  useCreateIdeaMutation,
  useGetAiIdeasLazyQuery,
} from '@/lib/generated/client'
import { showSuccess, showError } from '@/components/showNotification'
import { useRouter } from 'next/router'
import { useGetIdea } from '@/utils/hooks/useGetIdea'
import { IdeaFormSchema } from '../IdeaFormSchema'
import { useEffect } from 'react'

export const UseCreateIdea = () => {
  const form = useForm({
    resolver: zodResolver(IdeaFormSchema),
    mode: 'onChange',
    defaultValues: {
      stance: 'free_right',
      publish: true,
    },
  })
  const [createIdeaMutation] = useCreateIdeaMutation()
  const router = useRouter()
  const { name } = router.query
  const { refetch } = useGetIdea()
  const [getAiIdeas] = useGetAiIdeasLazyQuery()

  useEffect(() => {
    if (name) {
      getAiIdeas().then((res) => {
        const idea = res.data?.aiIdeas.filter((idea) => idea.name === name)[0]
        const resetData: FieldValues = {
          name: idea?.name ?? '',
          background: idea?.background ?? '',
          goal: idea?.goal ?? '',
          tagList: idea?.ideaTags,
        }
        form.reset(resetData)
      })
    }
  }, [name, form, getAiIdeas])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
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
    if (response.data!.createIdea!.success) {
      showSuccess({ action: 'アイデアの作成' })
      refetch()
      router.push(`/ideas/${response.data!.createIdea!.idea!.id}`)
    } else {
      showError({
        action: 'アイデアの作成',
        message: String(response.data!.createIdea!.errors),
      })
    }
  }

  return { onSubmit, form }
}
