import { Grid, Image } from '@mantine/core'
import type { CustomLayout } from 'next'

export const AuthLayout: CustomLayout = (page) => {
  return (
    <Grid grow gutter="xs">
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Image
          mx="auto"
          fit="contain"
          src="/img/userAuth.webp"
          alt="user auth image"
          h={{ base: 300, md: 450 }}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>{page}</Grid.Col>
    </Grid>
  )
}
