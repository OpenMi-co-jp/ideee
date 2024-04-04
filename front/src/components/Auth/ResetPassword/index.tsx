import { Button, Paper, Title, Grid, Container } from '@mantine/core'
import { PasswordForm } from '@/components/ReactFormSet'
import type { CustomNextPage } from 'next'
import { useResetPassword } from './hooks'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

export const ResetPassword: CustomNextPage = () => {
  const router = useRouter()
  const { reset_password_token } = router.query

  Cookies.set('reset_password_token', String(reset_password_token), {
    expires: 1 / 2 / 24, // 30分間に設定
    secure: true,
  })
  const { form, onSubmit } = useResetPassword()

  return (
    <Container size="xs">
      <Paper p="md" radius="md" shadow="md">
        <Title order={2} mb={30}>
          パスワードをリセット
        </Title>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <PasswordForm
            form={form}
            name="password"
            label="パスワード"
            required
          />
          <PasswordForm
            form={form}
            name="passwordConfirmation"
            label="確認用パスワード"
            required
          />
          <Grid gutter="md">
            <Grid.Col style={{ marginTop: '1rem' }}>
              <Button type="submit" fullWidth>
                パスワードをリセット
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}
