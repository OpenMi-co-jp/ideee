import { Center, Paper, Title, Button } from '@mantine/core'
import Link from 'next/link'

export const SignInInvitation = () => {
  return (
    <Center>
      <Paper shadow="md" radius="xs" p="xl" m="7rem">
        <Center>
          <Title order={5} fw="normal" my="lg">
            無料登録してアイデアを見に行く💡
          </Title>
        </Center>
        <Center>
          <Link href="/user/sign_up">
            <Button
              w="13rem"
              variant="gradient"
              gradient={{ from: 'red', to: 'orange' }}
            >
              ユーザー登録
            </Button>
          </Link>
        </Center>
      </Paper>
    </Center>
  )
}
