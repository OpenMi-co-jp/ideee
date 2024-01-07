import { Button, Paper, Title, Grid } from '@mantine/core'
import { TextForm } from '@/components/ReactFormSet'
import type { CustomNextPage } from 'next'
import { useConfirmResend } from './hooks'

export const ConfirmResend: CustomNextPage = () => {
  const { form, onSubmit } = useConfirmResend()

  return (
    <Paper p="md" radius="md" shadow="md">
      <Title order={2} mb={30}>
        確認メールが届いていない場合
      </Title>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <TextForm
          form={form}
          name="email"
          label="メールアドレス"
          placeholder="ideee@example.com"
          required
        />
        <Grid gutter="md">
          <Grid.Col style={{ marginTop: '1rem' }}>
            <Button type="submit" fullWidth>
              確認用メール再送信
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </Paper>
  )
}
