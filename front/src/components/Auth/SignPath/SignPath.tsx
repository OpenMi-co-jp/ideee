import { Title, Card, Image, Button, Grid, Flex } from '@mantine/core'
import Link from 'next/link'
import type { CustomNextPage } from 'next'

export const SignPath: CustomNextPage = () => {
  return (
    <Grid grow gutter="xs">
      <Grid.Col span={6}>
        <Image
          mx="auto"
          height="240"
          fit="contain"
          src="/img/userAuth.webp"
          alt="user auth image"
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <Card radius="0.5rem" shadow="xl">
          <Title order={3} m="lg">
            ログインして続きを確認
          </Title>
          <Flex>
            <Link href="/users/sign_up">
              <Button
                m="lg"
                variant="gradient"
                gradient={{ from: 'yellow', to: 'orange' }}
              >
                ユーザー登録
              </Button>
            </Link>
            <Link href="/users/sign_in">
              <Button m="lg" variant="outline" color="orange">
                ログイン
              </Button>
            </Link>
          </Flex>
        </Card>
      </Grid.Col>
    </Grid>
  )
}
