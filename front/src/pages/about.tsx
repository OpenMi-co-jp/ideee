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
} from '@mantine/core'
import React from 'react'
import { useMediaQuery } from '@mantine/hooks'
import { useLoggedIn } from '@/components/loginContext'
import LoginInvitationBox from '@/pages/about/loginInvitationBox'
import { ColorsComponent } from '@/components/footDesignComponent/colorsComponent'

const AboutPage = () => {
  const loggedIn = useLoggedIn()
  const isMobile = useMediaQuery(`(max-width: ${rem(380)})`)
  const objectMinWidth = useMediaQuery(`(max-width: ${rem(750)})`)
  const betweenWidth = useMediaQuery(
    '(min-width: 658px) and (max-width: 750px)'
  )

  return (
    <Box mx="xs">
      <Container mt="13rem">
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
              src={'/img/about_lightbulb.webp'}
              alt="アイデアを探す人"
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
                  src={'/img/about_search.webp'}
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

            <Paper mb="10rem" ml="2.2rem" mt={betweenWidth ? '8rem' : ''}>
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
                  src={'/img/about_overview.webp'}
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
            <Paper mb="10rem" ml="2.2rem" mt={betweenWidth ? '8rem' : ''}>
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
                  src={'/img/about_connect.webp'}
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
            <Paper mb="10rem" ml="2.2rem" mt={betweenWidth ? '8rem' : ''}>
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

      <Container
        my="5rem"
        style={{
          flexDirection: objectMinWidth ? 'column' : 'row',
          display: 'flex',
        }}
      >
        <Title order={2} mb="xl" m={isMobile ? '12%' : ''}>
          全ての才能が有効活用され、世の中のもったいないを無くす
        </Title>
        <Text align="center" m={isMobile ? '8%' : ''}>
          ideeeは、もったいないを無くし「誰かの役に立つもの」を増やすために作られています。
          <br />
          アイデアが思いつく人、アイデアを形にできる人。それぞれが才能です。「作ったけど需要がなくて使われない」「アイデアは面白いけどリソースがなくて作れない」才能たちをマッチさせることによって、そんな機会損失を少しでも無くしていけると考えています。
          <br />
          改善を見つける才能・開発の才能をぜひ活かしましょう
        </Text>
      </Container>

      <Container w="100%" my="8rem">
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

      {!loggedIn && <LoginInvitationBox />}

      <ColorsComponent />
    </Box>
  )
}
export default AboutPage
