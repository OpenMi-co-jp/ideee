import { zodResolver } from '@hookform/resolvers/zod'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { TeamFormSchema } from '@/components/teams/create/TeamFormSchema'
import {
  useCreateTeamMutation,
  useGetTeamQuery,
  useUpdateTeamMutation,
} from '@/lib/generated/client'
import { useRouter } from 'next/navigation'
import { showError, showSuccess } from '@/components/showNotification'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { useGetIdea } from '@/utils/hooks/useGetIdea'
import { useEffect } from 'react'

export const useTeamMutation = () => {
  const form = useForm({
    resolver: zodResolver(TeamFormSchema),
    mode: 'onChange',
  })

  const [createTeamMutation] = useCreateTeamMutation()
  const [updateTeamMutation] = useUpdateTeamMutation()

  const router = useRouter()

  const { currentUser } = useCurrentUser()
  const { data } = useGetIdea()
  const { data: team } = useGetTeamQuery({
    variables: {
      id: data?.idea?.team?.id as string,
    },
  })

  useEffect(() => {
    if (data?.idea.team !== null && team?.team) {
      form.reset({
        ...team.team,
      })
    }
  }, [data?.idea.team, team?.team, form])

  const onSubmit: SubmitHandler<FieldValues> = async (FormData) => {
    if (data?.idea.team === null) {
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
          action: 'チームの作成に失敗しました。',
          message: String(response.data!.createTeam?.errors),
        })
      }
    } else {
      const response = await updateTeamMutation({
        variables: {
          input: {
            id: team?.team?.id as string,
            ownerId: String(team?.team.ownerId),
            offer: FormData.offer,
            requirement: FormData.requirement,
          },
        },
      })
      if (response.data!.updateTeam!.success) {
        showSuccess({ action: 'チームの更新' })
        router.push(`/teams/${response.data!.updateTeam!.team!.id}`)
      } else {
        showError({
          action: 'チームの更新に失敗しました。',
          message: String(response.data!.updateTeam?.errors),
        })
      }
    }
  }

  return { onSubmit, form }
}
