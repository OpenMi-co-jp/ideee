import { Card, Grid, Image } from '@mantine/core'
import type { CustomLayout } from 'next'

export const AuthLayout: CustomLayout = (page) => {
  return (
    <Card padding="xl">
      <Grid grow gutter="xs">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card>
            <Card.Section>
              <Image
                mx="auto"
                fit="cover"
                src="/img/userAuth.webp"
                alt="user auth image"
                //TODO: 指定するイメージの確認
                fallbackSrc="https://placehold.co/600x400?text=Placeholder"
              />
            </Card.Section>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>{page}</Grid.Col>
      </Grid>
    </Card>
  )
}
