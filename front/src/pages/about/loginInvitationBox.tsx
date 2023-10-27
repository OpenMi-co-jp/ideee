import { Center, Paper, Title, Button } from '@mantine/core'
import  Link  from 'next/link'

export default function LoginInvitationBox() {

return (
  <>
    <Center>
      <Paper
        miw="15rem"
        my="7rem"
        shadow="md"
        radius="xs"
        py="lg"
        px="lg"
        mx="10rem"
      >
        <Center>
          <Title order={5} fw="normal" my="lg">
            無料登録してアイデアを見に行く💡
          </Title>
        </Center>
        <Center>
          <Link href="/user/sign_up">
            <Button
              w="13rem"
              mb="xs"
              variant="gradient"
              gradient={{ from: 'red', to: 'orange' }}
            >
              ユーザー登録
            </Button>
          </Link>
        </Center>
      </Paper>
    </Center>
    </>
  )
}

