import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useIdea } from '@/context/IdeaContext'
import { useEffect } from 'react'
import { useUpdateIdeaMutation } from '@/lib/generated/client'
import { showSuccess, showError } from '@/components/showNotification'
import { useRouter } from 'next/router'
import { useGetIdea } from '@/utils/hooks/useGetIdea'
import { IdeaFormSchema } from '../IdeaFormSchema'

export const UseEditIdea = () => {
  const form = useForm({
    resolver: zodResolver(IdeaFormSchema),
    mode: 'onChange',
  })
  const idea = useIdea()
  const [updateIdeaMutation] = useUpdateIdeaMutation()
  const router = useRouter()
  const { refetch } = useGetIdea()

  useEffect(() => {
    if (idea) {
      form.reset({
        ...idea,
        publish: !idea.draft,
        tagList: idea.ideaTags?.map((tag) => String(tag.name)),
      })
    }
  }, [idea, form])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const response = await updateIdeaMutation({
      variables: {
        input: {
          id: idea?.id,
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
          userId: String(idea?.userId),
          tagList: data.tagList,
        },
      },
    })
    if (response.data!.updateIdea!.success) {
      showSuccess({ action: 'アイデアの更新' })
      refetch()
      router.push(`/ideas/${response.data!.updateIdea!.idea!.id}`)
    } else {
      showError({
        action: 'アイデアの更新',
        message: String(response.data!.updateIdea!.errors),
      })
    }
  }

  return { onSubmit, form }
}
