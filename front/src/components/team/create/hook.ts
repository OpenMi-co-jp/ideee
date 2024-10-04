import { showError, showSuccess } from '@/components/showNotification'
import { TeamFormSchema } from '@/components/team/TeamFormSchema'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { useCreateTeamMutation } from '@/lib/generated/client'
import { useGetIdea } from '@/utils/hooks/useGetIdea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

export const useCreateTeam = () => {
  const [createTeamMutation] = useCreateTeamMutation()

  const router = useRouter()
  const { currentUser } = useCurrentUser()
  const { data } = useGetIdea()

  const form = useForm({
    resolver: zodResolver(TeamFormSchema),
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<FieldValues> = async (FormData) => {
    const response = await createTeamMutation({
      variables: {
        input: {
          ideaId: String(data?.idea.id),
          offer: FormData.offer,
          ownerId: String(currentUser?.id),
          requirement: FormData.requirement,
        },
      },
    })

    if (response.data!.createTeam!.success) {
      showSuccess({ action: 'チームの作成' })
      router.push(`/teams/${response.data!.createTeam!.team.id}`)
    } else {
      showError({
        action: 'チームの作成',
        message: String(response.data!.createTeam?.errors),
      })
    }
  }
  return { onSubmit, form }
}
