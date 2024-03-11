import { Button, Flex, Group } from '@mantine/core'
import { useNotificationConfig } from '@/components/user/setting/hooks'
import { LoaderBox } from '@/components/features'
import { AlertError } from '@/components/alert'
import { SwitchForm } from '@/components/ReactFormSet'

export const MailSettingForm = () => {
  const { form, onSubmit, loading, error } = useNotificationConfig()

  if (loading) return <LoaderBox />
  if (error) return <AlertError />

  return (
    <Group p="md" justify="center">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Flex direction="column" gap="xl">
          <SwitchForm
            label="アイデアへのコメント"
            name="commentEmail"
            form={form}
          />
          <SwitchForm
            label="下書きへのリマインド"
            name="draftRemindEmail"
            form={form}
          />
          <SwitchForm
            label="イベントのお知らせ"
            name="eventEmail"
            form={form}
          />
          <SwitchForm label="ハートのお知らせ" name="heartEmail" form={form} />
          <SwitchForm
            label="チーム開発参加のお知らせ"
            name="teamJoinEmail"
            form={form}
          />
          <SwitchForm
            label="チーム開発脱退のお知らせ"
            name="teamLeaveEmail"
            form={form}
          />
          <SwitchForm
            label="チーム開発のメッセージ"
            name="teamMessageEmail"
            form={form}
          />
          <SwitchForm label="週間ランキング" name="weeklyEmail" form={form} />
          <Button type="submit" variant="outline" color="orange" mt="xl">
            保存
          </Button>
        </Flex>
      </form>
    </Group>
  )
}
