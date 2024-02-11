import { useBreakPoint } from '@/utils/hooks/useBreakPoint'
import {
  Title,
  Text,
  Center,
  Image,
  Grid,
  Flex,
  Space,
  rem,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

export const Introduction = () => {
  const { isMobile } = useBreakPoint()

  return (
    <Center>
      <Grid mt="5rem" gutter="xl">
        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          <Flex direction="column">
            <Title
              order={1}
              size="h3"
              style={{
                textAlign: isMobile ? 'left' : 'center',
              }}
            >
              ideeeとは
            </Title>
            <Space my="lg" />
            <Text style={{ textAlign: isMobile ? 'left' : 'center' }}>
              アイデアとエンジニアの
              <br />
              マッチングプラットフォーム
            </Text>
            <Space my="xs" />
            <Text style={{ textAlign: isMobile ? 'left' : 'center' }}>
              アイデアをアイデアで終わらせない。
              <br />
              つくれる人と繋がり、アイデアを実現しよう
            </Text>
          </Flex>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          <Image
            src={'/img/about_lightbulb.webp'}
            alt="アイデアを探す人"
            h={260}
            fit="contain"
          />
        </Grid.Col>
      </Grid>
    </Center>
  )
}
