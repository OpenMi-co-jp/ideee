import { Center, Paper, Title, Button } from '@mantine/core'
import Link from 'next/link'
import { SIGNUP_TEXT, SIGNUP_URL } from '@/utils/constant'

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
          <Link href={SIGNUP_URL}>
            <Button
              w="13rem"
              variant="gradient"
              gradient={{ from: 'red', to: 'orange' }}
            >
              {SIGNUP_TEXT}
            </Button>
          </Link>
        </Center>
      </Paper>
    </Center>
  )
}
