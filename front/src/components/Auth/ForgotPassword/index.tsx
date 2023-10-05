import { Button, Paper, Title, Grid } from '@mantine/core'
import { TextForm } from '@/components/ReactFormSet'
import type { CustomNextPage } from 'next'
import { useForgotPassword } from './hooks'

export const ForgotPassword: CustomNextPage = () => {
  const { form, onSubmit } = useForgotPassword()

  return (
    <Paper p="md" radius="md" shadow="md">
      <Title order={2} mb={30}>
        パスワードを忘れた？
      </Title>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* <TextForm form={form} name="email" label="メールアドレス" required /> */}
        <Grid gutter="md">
          <Grid.Col style={{ marginTop: '1rem' }}>
            <Button type="submit" fullWidth>
              パスワードリセット用メール送信
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </Paper>
  )
}
