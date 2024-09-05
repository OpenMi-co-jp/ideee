import { zodResolver } from '@hookform/resolvers/zod'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { TeamFormSchema } from '@/components/idea/show/form/TeamFormSchema'
import { useCreateTeamMutation } from '@/lib/generated/client'
import { useRouter } from 'next/navigation'
import { showError, showSuccess } from '@/components/showNotification'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { useGetIdea } from '@/utils/hooks/useGetIdea'

export const useCreateTeam = () => {
  const form = useForm({
    resolver: zodResolver(TeamFormSchema),
    mode: 'onChange',
  })

  const [createTeamMutation] = useCreateTeamMutation()
  const router = useRouter()

  const { currentUser } = useCurrentUser()
  const { data, loading, error } = useGetIdea()

  const onSubmit: SubmitHandler<FieldValues> = async (FormData) => {
    console.log('処理が開始されました。')

    // すでにアイディアに対してのチームが発足されていればエラーとする
    const response = await createTeamMutation({
      variables: {
        input: {
          ideaId: String(data?.idea.id),
          membersNum: 0,
          offer: FormData.offer,
          ownerId: String(currentUser?.id),
          requirement: FormData.offer,
          status: 0,
        },
      },
    })
    if (response.data!.createTeam!.success) {
      showSuccess({ action: 'アイデアの作成' })
      router.push(`/teams/${response.data!.createTeam!.team.id}`)
    } else {
      showError({
        action: 'アイデアの作成に失敗しました。',
        // ERRORがない。
        message: String(response.data!.createTeam!.success),
      })
    }
  }
  return { onSubmit, form }
}
