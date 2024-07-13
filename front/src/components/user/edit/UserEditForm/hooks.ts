import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useUser } from '@/context/userProfileContext'
import { useEffect } from 'react'
import { useUpdateUserMutation } from '@/lib/generated/client'
import { useRouter } from 'next/router'
import { SubmitHandler, FieldValues } from 'react-hook-form'
import { useGetUser } from '@/utils/hooks/useGetUser'
import { showSuccess, showError } from '@/components/showNotification'
import { base64ImageValidation } from '@/utils/CustomValidation'

const twitterUrlRegex =
  /^https:\/\/x\.com\/[a-zA-Z0-9]+(-?[a-zA-Z0-9]+)*(\/[a-zA-Z0-9-]*)?$/

const githubUrlRegex =
  /^https:\/\/github\.com\/[a-zA-Z0-9]+(-?[a-zA-Z0-9]+)*(\/[a-zA-Z0-9-]*)?$/

const idRegex = /^[a-zA-Z0-9_]*$/

const UserEditFormSchema = z.object({
  name: z.string().max(30, { message: '名前は30文字以内で入力してください' }),
  description: z
    .string()
    .max(200, { message: '自己紹介は200文字以内で入力してください' })
    .nullish(),
  definition: z.string({ invalid_type_error: 'タイプを選択してください' }),
  twitterId: z
    .string()
    .refine(
      (value) => {
        if (value.startsWith('https')) {
          return twitterUrlRegex.test(value)
        } else {
          return idRegex.test(value)
        }
      },
      {
        message:
          '入力はhttps://x.comで始まるURL、またはXアカウント名である必要があります。',
      }
    )
    .nullish(),
  githubId: z
    .string()
    .refine(
      (value) => {
        if (value.startsWith('https')) {
          return githubUrlRegex.test(value)
        } else {
          return idRegex.test(value)
        }
      },
      {
        message:
          '入力はhttps://github.comで始まるURL、またはGithubアカウント名である必要があります。',
      }
    )
    .nullish(),
  siteUrl: z.union([
    z.string().url({ message: 'URLの形式で入力してください' }).nullish(),
    z.literal(''),
  ]),
  icon: base64ImageValidation(
    '登録できない画像形式です。別の形式でもう一度お試しください。'
  ),
})

export const UpdateUser = () => {
  const form = useForm({
    resolver: zodResolver(UserEditFormSchema),
    mode: 'onBlur',
  })
  const { refetch } = useGetUser()

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
            icon: data.icon,
          },
        },
      })
      if (response.data?.updateUser?.success) {
        showSuccess({ action: 'ユーザー情報の更新' })
        refetch()
        router.push(`/users/${response.data.updateUser.user.id}`)
      } else {
        showError({
          action: 'ユーザー情報の更新',
          message: String(response.data?.updateUser?.errors),
        })
      }
    } catch (err: any) {
      showError({
        action: 'ユーザー情報の更新',
        message: err.message as string,
      })
    }
  }

  return { onSubmit, loading, error, form }
}
