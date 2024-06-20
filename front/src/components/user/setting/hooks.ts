import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useEffect } from 'react'
import {
  useGetNotificationConfigQuery,
  useUpdateNotificationConfigMutation,
} from '@/lib/generated/client'
import { showError, showSuccess } from '@/components/showNotification'
import { SubmitHandler, FieldValues } from 'react-hook-form'

const NotificationConfigSchema = z.object({
  commentEmail: z.boolean(),
  draftRemindEmail: z.boolean(),
  eventEmail: z.boolean(),
  heartEmail: z.boolean(),
  teamJoinEmail: z.boolean(),
  teamLeaveEmail: z.boolean(),
  teamMessageEmail: z.boolean(),
  weeklyEmail: z.boolean(),
})

export const useNotificationConfig = () => {
  const form = useForm({
    resolver: zodResolver(NotificationConfigSchema),
    mode: 'onBlur',
  })
  const { data, loading, error } = useGetNotificationConfigQuery()
  const [updateNotificationConfigMutation] =
    useUpdateNotificationConfigMutation()

  useEffect(() => {
    if (data?.notificationConfig) {
      form.reset({
        ...data.notificationConfig,
      })
    }
  }, [data, form])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    updateNotificationConfigMutation({
      variables: {
        input: {
          commentEmail: data.commentEmail,
          draftRemindEmail: data.draftRemindEmail,
          eventEmail: data.eventEmail,
          heartEmail: data.heartEmail,
          teamJoinEmail: data.teamJoinEmail,
          teamLeaveEmail: data.teamLeaveEmail,
          teamMessageEmail: data.teamMessageEmail,
          weeklyEmail: data.weeklyEmail,
        },
      },
    }).then((response) => {
      if (response.data!.updateNotificationConfig!.success) {
        showSuccess({ action: '通知設定更新' })
      } else {
        showError({
          action: '通知設定更新',
          message: String(response.data!.updateNotificationConfig!.errors),
        })
      }
    })
  }

  return { form, onSubmit, loading, error }
}
