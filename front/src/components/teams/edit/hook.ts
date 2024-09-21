import { showError, showSuccess } from '@/components/showNotification'
import { TeamFormSchema } from '@/components/teams/TeamFormSchema'
import { useGetTeamQuery, useUpdateTeamMutation } from '@/lib/generated/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

export const useUpdateTeam = () => {
  const [updateTeamMutation] = useUpdateTeamMutation()

  const router = useRouter()

  const id = useParams()?.id as string
  const { data } = useGetTeamQuery({
    variables: {
      id,
    },
  })

  const form = useForm({
    resolver: zodResolver(TeamFormSchema),
    mode: 'onChange',
  })

  useEffect(() => {
    if (data) {
      form.reset({
        ...data.team,
      })
    }
  }, [data, form])

  const onSubmit: SubmitHandler<FieldValues> = async (FormData) => {
    const response = await updateTeamMutation({
      variables: {
        input: {
          id: data?.team?.id as string,
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
      showError({
        action: 'チームの更新',
        message: String(response.data!.updateTeam?.errors),
      })
    }
  }
  return { onSubmit, form }
}
