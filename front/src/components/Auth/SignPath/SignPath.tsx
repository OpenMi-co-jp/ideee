import { Title, Card, Image, Button, Grid, Col } from '@mantine/core'
import Link from 'next/link'
import type { CustomNextPage } from 'next'

export const SignPath: CustomNextPage = () => {
  return (
    <Card padding="xl">
      <Grid grow gutter="xs">
        <Col span={12} md={6}>
          <Image
            mx="auto"
            height="15rem"
            fit="contain"
            src="/img/userAuth.webp"
            alt="user auth image"
            withPlaceholder
          />
        </Col>
        <Col span={12} md={6}>
          <Card radius="0.5rem" shadow="xl">
            <Title order={3} m="lg">
              ログインして続きを確認
            </Title>
            <Link href="/user/sign_up">
              <Button
                m="lg"
                variant="gradient"
                gradient={{ from: 'yellow', to: 'orange' }}
              >
                ユーザー登録
              </Button>
            </Link>
            <Link href="/user/sign_in">
              <Button
                m="lg"
                variant="gradient"
                gradient={{ from: 'orange', to: 'yellow' }}
              >
                ログイン
              </Button>
            </Link>
          </Card>
        </Col>
      </Grid>
    </Card>
  )
}
