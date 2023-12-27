import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useUser } from '@/context/userProfileContext'
import { useEffect } from 'react'
import { useUpdateUserMutation } from '@/lib/generated/client'
import { useRouter } from 'next/router'
import { SubmitHandler, FieldValues } from 'react-hook-form'

const UserEditFormSchema = z.object({
  name: z.string().max(30, { message: '名前は30文字以内で入力してください' }),
  description: z
    .string()
    .max(200, { message: '自己紹介は200文字以内で入力してください' })
    .nullish(),
  definition: z.string().max(30, { message: 'タイプを選択してください' }),
  twitterId: z.string().nullish(),
  githubId: z.string().nullish(),
  siteUrl: z.string().url({ message: 'URLの形式で入力してください' }).nullish(),
})

export const UpdateUser = () => {
  const form = useForm({
    resolver: zodResolver(UserEditFormSchema),
    mode: 'onBlur',
  })

  const router = useRouter()
  const [updateUserMutation, { loading, error }] = useUpdateUserMutation()

  const user = useUser()

  const getRoleFlags = (definition: string) => {
    const isIdeaMan =
      definition === 'idea_man' || definition === 'idea_engineer'
    const isEngineer =
      definition === 'engineer' || definition === 'idea_engineer'
    return { isIdeaMan, isEngineer }
  }

  useEffect(() => {
    if (user) {
      const { isIdeaMan, isEngineer } = getRoleFlags(user.definition as string)
      form.reset({
        ...user,
        isIdeaMan,
        isEngineer,
      })
    }
  }, [user, form])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await updateUserMutation({
        variables: {
          input: {
            id: String(user?.id),
            name: data.name,
            description: data.description,
            definition: data.definition,
            twitterId: data.twitterId,
            githubId: data.githubId,
            siteUrl: data.siteUrl,
          },
        },
      })
      if (response.data?.updateUser?.success) {
        alert('プロファイルを更新しました')
        router.push(`/users/${response.data.updateUser.user.id}`)
      } else {
        alert('プロファイルの更新に失敗')
      }
    } catch (err) {
      console.error(err)
      alert('更新中にエラーが発生しました')
    }
  }

  return { onSubmit, loading, error, form }
}
