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
  const { data } = useGetIdea()

  const onSubmit: SubmitHandler<FieldValues> = async (FormData) => {
    const response = await createTeamMutation({
      variables: {
        input: {
          ideaId: String(data?.idea.id),
          offer: FormData.offer,
          ownerId: String(currentUser?.id),
          requirement: FormData.offer,
        },
      },
    })
    if (response.data!.createTeam!.success) {
      showSuccess({ action: 'チームの作成' })
      router.push(`/teams/${response.data!.createTeam!.team.id}`)
    } else {
      showError({
        action: 'アイデアの作成に失敗しました。',
        // ERRORがない。
        message: String(response.data!.createTeam?.errors),
      })
    }
  }
  return { onSubmit, form }
}
