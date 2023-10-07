import {
  Text,
  Group,
  Grid,
  Card,
  Center,
  Container,
  createStyles,
  Space,
  Flex,
  Title,
  Image,
  rem,
  Box,
  Paper,
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
  LeftImage: {
    flex: 1,
    width: '500px',
    height: '445px',
    borderRadius: '50%',
    background: 'rgba(239, 213, 120, 0.49)',
    top: 0,
    left: '35px',
    position: 'relative',
    transition: 'all 0.3s',
    '@media (max-width: 649px)': {
      width: '310px',
      height: '250px',
    },
    '@media (max-width: 1000px) and (min-width:650px)': {
      width: '333px',
      height: '290px',
    },
  },

  RightImage: {
    flex: 1,
    width: '500px',
    height: '445px',
    borderRadius: '50%',
    background: 'rgba(215, 145, 145, 0.50)',
    position: 'relative',
    top: '50px',
    '@media (max-width: 649px)': {
      width: '310px',
      height: '250px',
    },
    '@media (max-width: 1000px) and (min-width:650px)': {
      width: '333px',
      height: '290px',
    },
  },
}))

const AboutPage = () => {
  const { classes } = useStyles()
  const isMobile = useMediaQuery(`(max-width: ${rem(500)})`)

  return (
    <Box mx="xs">
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
                width: isMobile ? '80%' : '40%',
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

        <Container
          style={{
            flexDirection: isMobile ? 'column' : 'row',
            display: 'flex',
            marginLeft: '-40px',
          }}
        >
          <Container>
            <Card
              style={{
                position: 'relative',
                flexDirection: 'column',
                display: 'flex',
              }}
            >
              <div
                style={{
                  width: '260px',
                  height: '260px',
                  borderRadius: '50%',
                  backgroundColor: '#F5D0A9',
                  position: 'relative',
                  marginLeft: '-10px',
                }}
              />
              <Image
                src={'/img/undraw_location_search_re_ttoj 1.png'}
                alt="コラボレーションイメージ"
                height="auto"
                width="15rem"
                style={{
                  position: 'absolute',
                  top: '17px',
                  left: '10px',
                  zIndex: 1,
                }}
              />
            </Card>
            <Center>
              <Paper>
                <Title order={3} color="#DBA901">
                  アイデアが見つかる
                </Title>
                <Text w="13rem">
                  権利フリーのアイデアもたくさん見つかります。
                  <br />
                  あなたのコードで世の中をちょっとよくしませんか？
                </Text>
              </Paper>
            </Center>
          </Container>

          <Container>
            <Card
              style={{
                position: 'relative',
                flexDirection: 'column',
                display: 'flex',
              }}
            >
              <div
                style={{
                  width: '260px',
                  height: '260px',
                  borderRadius: '50%',
                  backgroundColor: '#F5D0A9',
                  position: 'relative',
                  marginLeft: '-10px',
                }}
              />
              <Image
                src={'/img/undraw_performance_overview_re_mqrq 1.png'}
                alt="コラボレーションイメージ"
                height="auto"
                width="15rem"
                style={{
                  position: 'absolute',
                  top: '55px',
                  left: '15px',
                  zIndex: 1,
                }}
              />
            </Card>
            <Center>
              <Paper>
                <Title order={3} color="#DBA901">
                  需要を確認できる
                </Title>
                <Text w="13rem">
                  作ってから誰にも使われないのはとてももったいない。
                  <br />
                  <br />
                  アイデアを公表し、反応を確認することでブラッシュアップされます。
                </Text>
              </Paper>
            </Center>
          </Container>

          <Container>
            <Card
              style={{
                position: 'relative',
                flexDirection: 'column',
                display: 'flex',
              }}
            >
              <div
                style={{
                  width: '260px',
                  height: '260px',
                  borderRadius: '50%',
                  backgroundColor: '#F5D0A9',
                  position: 'relative',
                  marginLeft: '-10px',
                }}
              />
              <Image
                src={'/img/Frame.png'}
                alt="コラボレーションイメージ"
                height="auto"
                width="15rem"
                style={{
                  position: 'absolute',
                  top: '55px',
                  left: '15px',
                  zIndex: 1,
                }}
              />
            </Card>
            <Center>
              <Paper>
                <Title order={3} color="#DBA901">
                  仲間が見つかる
                </Title>
                <Text w="13rem">
                  チーム開発の募集ができます。
                  <br />
                  実現したい世界観を描いて、チームを作れるユニークなギルドとして活用できます
                </Text>
              </Paper>
            </Center>
          </Container>
        </Container>
      </Container>

      <Center>
        <Container my="15rem">
          <Text>ideeeをより詳しく知りたい方はこちらをご覧ください。</Text>
        </Container>
      </Center>

      <Flex
        style={{
          position: 'relative',
          marginTop: '0px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        ml={isMobile ? '-70px' : ''}
        w={isMobile ? '380px' : '100%'}
      >
        <Box className={classes.LeftImage} />
        <Box className={classes.RightImage} />
      </Flex>
    </Box>
  )
}
export default AboutPage
