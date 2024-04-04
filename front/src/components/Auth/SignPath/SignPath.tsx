import { Title, Card, Image, Button, Grid, Flex } from '@mantine/core'
import Link from 'next/link'
import type { CustomNextPage } from 'next'
import {
  SIGNUP_TEXT,
  SIGNUP_URL,
  LOGIN_TEXT,
  LOGIN_URL,
} from '@/utils/constant'

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
            <Link href={SIGNUP_URL}>
              <Button
                m="lg"
                variant="gradient"
                gradient={{ from: 'yellow', to: 'orange' }}
              >
                {SIGNUP_TEXT}
              </Button>
            </Link>
            <Link href={LOGIN_URL}>
              <Button m="lg" variant="outline" color="orange">
                {LOGIN_TEXT}
              </Button>
            </Link>
          </Flex>
        </Card>
      </Grid.Col>
    </Grid>
  )
}
