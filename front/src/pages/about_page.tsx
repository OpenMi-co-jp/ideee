import {
  Text,
  Group,
  Grid,
  createStyles,
  Space,
  Flex,
  Title,
  Container,
  Image,
  Center,
  rem,
} from '@mantine/core'
import React from 'react'
import { useMediaQuery } from '@mantine/hooks'

const useStyles = createStyles(() => ({
  ImageTitle: {
    fontSize: '25px',
    fontWeight: 700,
    zIndex: 500,
    textAlign: 'center',
    paddingBottom: '5px',
    letterSpacing: '3px',
    '@media (max-width: 649px)': {
      fontSize: '15px',
    },
  },
  circlePattern: {
    width: '20rem',
    height: '20rem',
    background: 'radial-gradient(circle at center, #F5D0A9 50%, white 50.1%)',
  },
  circleStyle: {
    width: '16rem',
    height: '16rem',
    borderRadius: '50%',
    backgroundColor: '#F5D0A9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

const aboutPage = () => {
  const { classes } = useStyles()
  const isMobile = useMediaQuery(`(max-width: ${rem(500)})`)

  return (
    <Container mx="xs">
      <Container mt="13rem" mb="9rem" mx="6%">
        <Center>
          <Grid>
            <Group miw={110} mt="8rem" w="50%">
              <Flex direction="column">
                <Text
                  style={{ textAlign: 'left' }}
                  className={classes.ImageTitle}
                >
                  ideeeとは
                </Text>
                <Space my="md" />
                <Text>
                  アイデアとエンジニアの
                  <br />
                  マッチングプラットフォーム
                </Text>
                <Space my="xs" />
                <Text>
                  アイデアをアイデアで終わらせない。
                  <br />
                  つくれる人と繋がり、アイデアを実現しよう
                </Text>
              </Flex>
            </Group>
            <Space mx="xs" />

            <Image
              src={'/img/undraw_lightbulb_moment_re_ulyo 1.png'}
              alt="コラボレーションイメージ"
              my="5rem"
              style={{
                width: isMobile ? '100%' : '40%',
                height: 'auto',
              }}
            />
          </Grid>
        </Center>
      </Container>

      <Container>
        <Center>
          <Title order={2}>メリット</Title>
        </Center>
        <Space my="2rem" />
        <Container>
          <Center>
            <Group>
              <div
                style={{
                  width: '250px',
                  height: '250px',
                  borderRadius: '50%',
                  background: 'rgba(215, 145, 145, 0.50)',
                }}
              />
            </Group>
            <Space m="1.5rem" />
            <Group>
              <div
                style={{
                  width: '250px',
                  height: '250px',
                  borderRadius: '50%',
                  background: 'rgba(215, 145, 145, 0.50)',
                }}
              />
            </Group>
            <Space m="1.5rem" />
            <Group>
              <div
                style={{
                  width: '250px',
                  height: '250px',
                  borderRadius: '50%',
                  background: 'rgba(215, 145, 145, 0.50)',
                }}
              />
            </Group>
          </Center>
        </Container>
      </Container>
    </Container>
  )
}
export default aboutPage
