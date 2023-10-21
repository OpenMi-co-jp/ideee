import {
  Text,
  Group,
  Grid,
  Card,
  Center,
  Container,
  Space,
  Flex,
  Title,
  Image,
  rem,
  Box,
  Paper,
  Button,
} from '@mantine/core'
import React from 'react'
import { useState, useEffect } from 'react'
import { useMediaQuery } from '@mantine/hooks'
import Link from 'next/link'

const AboutPage = () => {
  const isMobile = useMediaQuery(`(max-width: ${rem(380)})`)
  const objectMinWidth = useMediaQuery(`(max-width: ${rem(750)})`)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0)
  const [marginTop, setMarginTop] = useState('')

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (windowWidth <= 653) {
      setMarginTop('')
    } else if (windowWidth <= 750) {
      setMarginTop('9rem')
    } else {
      setMarginTop('')
    }
  }, [windowWidth])

  return (
    <Box mx="xs">
      <Container mt="13rem" mb="9rem" mx="6%">
        <Center>
          <Grid>
            <Group miw={110} mt="8rem" w={isMobile ? '100%' : '50%'}>
              <Flex direction="column">
                <Text
                  style={{
                    textAlign: isMobile ? 'center' : 'left',
                    fontWeight: 700,
                    paddingBottom: '5px',
                    letterSpacing: '3px',
                    fontSize: '23px',
                  }}
                >
                  ideeeとは
                </Text>
                <Space my="md" />
                <Text style={{ textAlign: isMobile ? 'center' : 'left' }}>
                  アイデアとエンジニアの
                  <br />
                  マッチングプラットフォーム
                </Text>
                <Space my="xs" />
                <Text style={{ textAlign: isMobile ? 'center' : 'left' }}>
                  アイデアをアイデアで終わらせない。
                  <br />
                  つくれる人と繋がり、アイデアを実現しよう
                </Text>
              </Flex>
            </Group>
            <Space mx="xs" />
            <Image
              src={'/img/undraw_lightbulb_moment_re_ulyo-1.webp'}
              alt="アイデアを考える人"
              my="5rem"
              style={{
                marginLeft: isMobile ? '3%' : '',
                width: isMobile ? '80%' : '40%',
                height: 'auto',
              }}
            />
          </Grid>
        </Center>
      </Container>

      <Container w="100%">
        <Center>
          <Title order={2}>メリット</Title>
        </Center>
        <Space my="2rem" />

        <Container
          style={{
            flexDirection: objectMinWidth ? 'column' : 'row',
            display: 'flex',
            alignItems: isMobile ? 'center' : '',
          }}
        >
          <Group>
            <Center>
              <Card
                mb="lg"
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
                  src={'/img/undraw_location_search_re_ttoj-1.webp'}
                  alt="アイデアを探す女性"
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
            </Center>

            <Paper mb="10rem" ml="2.2rem" mt={marginTop}>
              <Title order={3} color="#DBA901" mb="lg" align="center">
                アイデアが見つかる
              </Title>
              <Text w="13rem" align="center">
                権利フリーのアイデアもたくさん見つかります。
                <br />
                あなたのコードで世の中をちょっとよくしませんか？
              </Text>
            </Paper>
          </Group>

          <Group>
            <Center>
              <Card
                mb="lg"
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
                  src={'/img/undraw_performance_overview_re_mqrq-1.webp'}
                  alt="データを確認する男性"
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
            </Center>
            <Paper mb="10rem" ml="2.2rem" mt={marginTop}>
              <Title order={3} color="#DBA901" mb="lg" align="center">
                需要を確認できる
              </Title>
              <Text w="13rem" align="center">
                作ってから誰にも使われないのはとてももったいない。
                <br />
                <br />
                アイデアを公表し、反応を確認することでブラッシュアップされます。
              </Text>
            </Paper>
          </Group>

          <Group>
            <Center>
              <Card
                mb="lg"
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
                  src={'/img/Frame.webp'}
                  alt="仲間見つける"
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
            </Center>
            <Paper mb="10rem" ml="2.2rem" mt={marginTop}>
              <Title order={3} color="#DBA901" mb="lg" align="center">
                仲間が見つかる
              </Title>
              <Text w="13rem" align="center">
                チーム開発の募集ができます。
                <br />
                実現したい世界観を描いて、チームを作れるユニークなギルドとして活用できます
              </Text>
            </Paper>
          </Group>
        </Container>
      </Container>

      <Center>
        <Card w="85%" bg="" p="3rem" radius="lg" shadow="md">
          <Title align="center" order={2} mb="xl">
            コンセプト💡
          </Title>
          <Text align="center">
            ideeeは、もったいないを無くし「誰かの役に立つもの」を増やすために作られています。
            <br />
            アイデアが思いつく人、アイデアを形にできる人。それぞれが才能です。「作ったけど需要がなくて使われない」「アイデアは面白いけどリソースがなくて作れない」才能たちをマッチさせることによって、そんな機会損失を少しでも無くしていけると考えています。
            <br />
            改善を見つける才能・開発の才能をぜひ活かしましょう
          </Text>
        </Card>
      </Center>

      <Container w="100%" mt="8rem">
        <Center>
          <Title order={3} fw="normal" my="4rem">
            ideeeをより詳しく知りたい方はこちらをご覧ください。
          </Title>
        </Center>
        <Box style={{ position: 'relative' }} w="100%" p="0" pt="56.25%">
          <iframe
            loading="lazy"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: '0',
              left: '0',
              border: 'none',
              padding: '0',
              margin: '0',
            }}
            src="https://www.canva.com/design/DAFw4Tm5BB4/view?embed"
            allowFullScreen
          >
            {' '}
          </iframe>
        </Box>
      </Container>

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

      <Flex
        style={{
          position: 'relative',
          marginTop: '0px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        ml={isMobile ? '5px' : '-20px'}
        w={isMobile ? '450px' : '100%'}
      >
        <Box
          style={{
            flex: 1,
            width: isMobile ? '330px' : '500px',
            height: isMobile ? '290px' : '445px',
            borderRadius: '50%',
            background: 'rgba(239, 213, 120, 0.49)',
            top: 0,
            left: isMobile ? '-5%' : '25px',
            position: 'relative',
            transition: 'all 0.3s',
          }}
        />
        <Box
          style={{
            flex: 1,
            width: isMobile ? '330px' : '500px',
            height: isMobile ? '290px' : '445px',
            borderRadius: '50%',
            background: 'rgba(215, 145, 145, 0.50)',
            position: 'relative',
            top: '50px',
            left: isMobile ? '-10%' : '-5px',
          }}
        />
      </Flex>
    </Box>
  )
}
export default AboutPage
