import { Col, Card, Grid, Image } from '@mantine/core'
import type { CustomLayout } from 'next'

export const AuthLayout: CustomLayout = (page) => {
  return (
    <Card padding="xl">
      <Grid grow gutter="xs">
        <Col span={12} md={6}>
          <Card>
            <Card.Section>
              <Image
                mx="auto"
                fit="cover"
                src="/img/userAuth.webp"
                alt="user auth image"
                withPlaceholder
              />
            </Card.Section>
          </Card>
        </Col>
        <Col span={12} md={6}>
          {page}
        </Col>
      </Grid>
    </Card>
  )
}
