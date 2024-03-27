import { Button, Paper, Title, Grid, Stack, Box } from '@mantine/core'
import { TextForm } from '@/components/ReactFormSet'
import type { CustomNextPage } from 'next'
import { useConfirmResend } from './hooks'
import Link from 'next/link'
import {
  SIGNUP_TEXT,
  SIGNUP_URL,
  LOGIN_TEXT,
  LOGIN_URL,
} from '@/utils/constant'

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
      <Box mt={'1rem'}>
        <Stack>
          <Link href={LOGIN_URL}>{LOGIN_URL}</Link>
        </Stack>
        <Stack>
          <Link href={SIGNUP_URL}>{SIGNUP_TEXT}</Link>
        </Stack>
        <Stack>
          <Link href="/users/forgot_password">パスワードを忘れた？</Link>
        </Stack>
      </Box>
    </Paper>
  )
}
