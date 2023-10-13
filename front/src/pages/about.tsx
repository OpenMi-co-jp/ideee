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
import { useMediaQuery } from '@mantine/hooks'
import Link from 'next/link'

const AboutPage = () => {
  const isMobile = useMediaQuery(`(max-width: ${rem(460)})`)
  const objectMinWidth = useMediaQuery(`(max-width: ${rem(750)})`)

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
            marginLeft: isMobile ? '' : '-5.5%',
            alignItems: isMobile ? 'center' : '',
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
            <Center>
              <Paper mt="lg" mb="10rem">
                <Title order={3} color="#DBA901" mb="lg">
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
            <Center>
              <Paper mt="lg" mb="10rem">
                <Title order={3} color="#DBA901" mb="lg">
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
            <Center>
              <Paper mt="lg" mb="10rem">
                <Title order={3} color="#DBA901" mb="lg">
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
