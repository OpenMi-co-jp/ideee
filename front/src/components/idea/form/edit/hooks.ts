import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useIdea } from '@/context/IdeaContext'
import { useEffect } from 'react'
import { useUpdateIdeaMutation } from '@/lib/generated/client'
import { showSuccess, showError } from '@/components/notifications'
import { useRouter } from 'next/router'
import { useGetIdea } from '@/utils/hooks/useGetIdea'

const IdeaEditFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: '名前を入力してください' })
    .max(50, { message: '名前は50文字以内で入力してください' }),
  background: z
    .string()
    .min(1, { message: '背景を入力してください' })
    .max(255, { message: '背景は255文字以内で入力してください' }),
  goal: z
    .string()
    .min(1, { message: 'ゴールを入力してください' })
    .max(255, { message: 'ゴールは255文字以内で入力してください' }),
  issue: z
    .string()
    .max(255, { message: 'ユーザーの課題は255文字以内で入力してください' })
    .nullish(),
  hypothesis: z
    .string()
    .max(255, { message: '仮説は255文字以内で入力してください' })
    .nullish(),
  monetize: z
    .string()
    .max(255, { message: '収益化方法は255文字以内で入力してください' })
    .nullish(),
  similar: z
    .string()
    .max(255, { message: '類似製品は255文字以内で入力してください' })
    .nullish(),
  stance: z
    .enum(['free_right', 'personal_project', 'team_project'])
    .nullish()
    .refine((data) => data !== null, {
      message: 'スタンスを選択してください',
    }),
  target: z
    .string()
    .max(255, { message: 'ターゲットは255文字以内で入力してください' })
    .nullish(),
  wishFunction: z
    .string()
    .max(255, { message: '希望機能は255文字以内で入力してください' })
    .nullish(),
  githubUrl: z
    .string()
    .url({ message: 'URLの形式で入力してください' })
    .nullish(),
  productUrl: z
    .string()
    .url({ message: 'URLの形式で入力してください' })
    .nullish(),
  draft: z.boolean().nullish(),
  icon: z.string().nullish(),
  tagList: z
    .array(
      z.string().max(50, { message: 'タグは50文字以内で入力してください' })
    )
    .nonempty({ message: '1つ以上のタグを設定してください' }),
})

export const UseEditIdea = () => {
  const form = useForm({
    resolver: zodResolver(IdeaEditFormSchema),
    mode: 'onBlur',
  })
  const idea = useIdea()
  const [updateIdeaMutation] = useUpdateIdeaMutation()
  const router = useRouter()
  const { refetch } = useGetIdea()

  useEffect(() => {
    if (idea) {
      form.reset({
        ...idea,
        tagList: idea.ideaTags?.map((tag) => String(tag.name)),
      })
    }
  }, [idea, form])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
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
            draft: data.draft,
            icon: data.icon,
            userId: String(idea?.userId),
            tagList: data.tagList,
          },
        },
      })
      if (response.data?.updateIdea?.success) {
        showSuccess({ action: 'アイデアの更新' })
        refetch()
        router.push(`/ideas/${response.data.updateIdea.idea?.id}`)
      } else {
        showError({
          action: 'アイデアの更新',
          message: String(response.data?.updateIdea?.errors),
        })
      }
    } catch (err: any) {
      showError({
        action: 'アイデアの更新',
        message: err.message as string,
      })
    }
  }

  return { onSubmit, form }
}
