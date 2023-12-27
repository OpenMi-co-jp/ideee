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

  useEffect(() => {
    if (user) {
      form.reset(user)
    }
  }, [user, form])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    updateUserMutation({
      variables: {
        input: {
          id: String(user?.id),
          name: data.name,
          description: data.description,
          definition: data.definition || 0, // TODO: 仮の値
          twitterId: data.twitterId,
          githubId: data.githubId,
          siteUrl: data.siteUrl,
        },
      },
    })
      .then((res) => {
        console.log('success')
        if (res.data?.updateUser?.success) {
          alert('プロファイルを更新しました')
          const userId = res.data?.updateUser?.user?.id
          router.push(`/users/${userId}`)
        } else {
          alert('プロファイルの更新に失敗')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return { onSubmit, loading, error, form }
}
