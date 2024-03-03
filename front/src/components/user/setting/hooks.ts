import { useState, useEffect } from 'react'
import { useCurrentUser } from '@/context/CurrentUserContext'
import {
  useGetNotificationConfigQuery,
  useUpdateNotificationConfigMutation,
} from '@/lib/generated/client'
import { showError, showSuccess } from '@/components/notifications'

export const useNotificationConfig = () => {
  const { currentUser } = useCurrentUser()
  const { data, loading, error } = useGetNotificationConfigQuery()
  const [updateNotificationConfigMutation] =
    useUpdateNotificationConfigMutation()
  const [items, setItems] = useState<
    { id: number; label: string; checked: boolean }[]
  >([])

  useEffect(() => {
    if (data?.notificationConfig) {
      const initialContents = [
        {
          id: 0,
          label: 'アイデアへのコメント',
          checked: data.notificationConfig.commentEmail,
        },
        {
          id: 1,
          label: '下書きへのリマインド',
          checked: data.notificationConfig.draftRemindEmail,
        },
        {
          id: 2,
          label: 'イベントのお知らせ',
          checked: data.notificationConfig.eventEmail,
        },
        {
          id: 3,
          label: 'ハートのお知らせ',
          checked: data.notificationConfig.heartEmail,
        },
        {
          id: 4,
          label: 'チーム開発参加のお知らせ',
          checked: data.notificationConfig.teamJoinEmail,
        },
        {
          id: 5,
          label: 'チーム開発脱退のお知らせ',
          checked: data.notificationConfig.teamLeaveEmail,
        },
        {
          id: 6,
          label: 'チーム開発のメッセージ',
          checked: data.notificationConfig.teamMessageEmail,
        },
        {
          id: 7,
          label: '週間ランキング',
          checked: data.notificationConfig.weeklyEmail,
        },
      ]
      setItems(initialContents)
    }
  }, [data])

  const handleSwitchChange = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    )
  }

  const handleSubmit = () => {
    updateNotificationConfigMutation({
      variables: {
        input: {
          commentEmail: items[0].checked,
          draftRemindEmail: items[1].checked,
          eventEmail: items[2].checked,
          heartEmail: items[3].checked,
          teamJoinEmail: items[4].checked,
          teamLeaveEmail: items[5].checked,
          teamMessageEmail: items[6].checked,
          weeklyEmail: items[7].checked,
        },
      },
    })
      .then((res) => {
        if (res.data?.updateNotificationConfig?.success) {
          showSuccess({ action: '通知設定更新' })
        }
      })
      .catch((error) => {
        showError({
          action: '通知設定更新',
          message: error.message.toString(),
        })
      })
  }

  return { items, handleSwitchChange, handleSubmit, loading, error }
}
