import { zodResolver } from '@hookform/resolvers/zod'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { TeamFormSchema } from '@/components/teams/create/TeamFormSchema'
import {
  useCreateTeamMutation,
  useGetTeamQuery,
  useUpdateTeamMutation,
} from '@/lib/generated/client'
import { useParams, useRouter } from 'next/navigation'
import { showError, showSuccess } from '@/components/showNotification'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { useGetIdea } from '@/utils/hooks/useGetIdea'
import { useEffect } from 'react'

export const useTeamMutation = () => {
  const [createTeamMutation] = useCreateTeamMutation()
  const [updateTeamMutation] = useUpdateTeamMutation()

  const router = useRouter()
  const { currentUser } = useCurrentUser()

  // 無駄な関数が走るので、createとupdateは分けるべきか、
  const { data } = useGetIdea()

  const id = useParams()?.id as string
  const { data: team } = useGetTeamQuery({
    variables: {
      id,
    },
  })

  const form = useForm({
    resolver: zodResolver(TeamFormSchema),
    mode: 'onChange',
  })

  useEffect(() => {
    if (team) {
      form.reset({
        ...team.team,
      })
    }
  }, [team, form])

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
          action: 'チームの作成',
          message: String(response.data!.createTeam?.errors),
        })
      }
    } else {
      const response = await updateTeamMutation({
        variables: {
          input: {
            id: team?.team?.id as string,
            offer: FormData.offer,
            requirement: FormData.requirement,
            status: 0,
          },
        },
      })
      if (response.data!.updateTeam!.success) {
        showSuccess({ action: 'チームの更新' })
        router.push(`/teams/${response.data!.updateTeam!.team!.id}`)
      } else {
        console.table(response.data!.updateTeam?.errors)
        showError({
          action: 'チームの更新',
          message: String(response.data!.updateTeam?.errors),
        })
      }
    }
  }

  return { onSubmit, form }
}
