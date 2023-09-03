import {
  Button,
  Container,
  Text,
  Title,
  Accordion,
  useMantineTheme,
  rem,
} from '@mantine/core'
import {
  IconBulb,
  IconFlag,
  IconUsers,
  IconWorld,
  IconDoorExit,
} from '@tabler/icons-react'
import Link from 'next/link'
const FrequentQuestion = () => {
  const theme = useMantineTheme()
  const getColor = (color: string) =>
    theme.colors[color][theme.colorScheme === 'dark' ? 5 : 7]

  return (
    <Container mr="5%" ml="5%">
      <Title fz={26} fw={100} mt={160} ml={18} mb={20}>
        よくある質問
      </Title>

      <Container mb={30}>
        <Accordion
          variant="contained"
          radius={10}
          style={{
            boxShadow: '0 4px 8px rgba(0, 0, 0.1, 0.2)',
            borderRadius: '10px',
          }}
        >
          <Accordion.Item value="bulb">
            <Accordion.Control
              icon={<IconBulb size={rem(20)} color={getColor('red')} />}
            >
              アイデアはどう探したらいいの？
            </Accordion.Control>
            <Accordion.Panel ml={19} mb={20}>
              <Text>リラックスした状態で</Text>
              <br />
              <Text>
                身の回りで困っていることやもったいないことアプリで楽になった経験なんかを思い出してみると
              </Text>
              <br />
              <Text>意外とアイデアは出てくるかも💡</Text>
              <br />
              <Button
                style={{
                  boxShadow: '0 3px 1px rgba(0, 0, 0.3, 3)',
                  color: 'FFCC99',
                }}
              >
                <Link href="">アイデアの出し方</Link>
              </Button>
              <br />
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="flag">
            <Accordion.Control
              icon={<IconFlag size={rem(20)} color={getColor('blue')} />}
            >
              Contributionsとは？
            </Accordion.Control>
            <Accordion.Panel ml={19}>
              <Text>
                Contribution（コントリビューション）とは貢献度を意味しideeeでの貢献度を表しています！
              </Text>
              <br />
              <Text>計算方法</Text>
              <Text>アイデア投稿✖️ 2p</Text>
              <Text>自分のアイデアに対してのハート数✖️ 1p</Text>
              <Text>アイデアに対してのハートを送った数✖️ 0.5p</Text>
              <Text>自分のアイデアに対してへのコメント数✖️ 1p</Text>
              <br />
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="users">
            <Accordion.Control
              icon={<IconUsers size={rem(20)} color={getColor('teal')} />}
            >
              チーム開発募集機能でできることは？
            </Accordion.Control>
            <Accordion.Panel ml={19}>
              <Text>現在の機能</Text>
              <Text>・チーム開発の募集条件を設定</Text>
              <Text>・チームリストの作成</Text>
              <Text>・参加メンバーだけがみることができるチャットスペース</Text>
              <Text>・アイデアが注目されやすくなる</Text>
              <br />
              <Text>今後の機能</Text>
              <Text>・オーナーごとの審査制にする</Text>
              <Text>・GitHub APIなどを利用した開発連携機能</Text>
              <Text>・開発の軌跡を記録して、開発ストーリーを記事化</Text>
              <br />
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="world">
            <Accordion.Control
              icon={<IconWorld size={rem(20)} color={getColor('blue')} />}
            >
              TwitterIDを登録するとどうなる？
            </Accordion.Control>
            <Accordion.Panel ml={19}>
              <Text>あなたのアイデアが採用されやすくなります</Text>
              <Text>自動ツイート機能</Text>
              <Text>
                ・アイデアを投稿すると　twitterlink　がアイデアをツイートします。
              </Text>
              <Text>
                ・上記のツイートにあなたのTwotterIDがメンションされます
              </Text>
              <Text>
                ・メンションが通知として役立ち、シェアをしやすくします
              </Text>
              <Text>
                ・紐づいたあなたのTwitterアカウントも注目されやすくなります
              </Text>
              <br />
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="doorexit">
            <Accordion.Control
              icon={<IconDoorExit size={rem(20)} color={getColor('yellow')} />}
            >
              退会方法は？
            </Accordion.Control>
            <Accordion.Panel ml={19}>
              <Text>
                ページ下部のideeeに対しての質問 or
                コメントに退会したい旨をお伝えください。
                <br />
                また、その際に退会理由とユーザー名も指定してお伝えくださると幸いです。
                <br />
                担当者が3営業日以内に対応致します。
                <br />
                <br />
              </Text>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Container>

      <Container w="100%">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSfZGyqfRpT0UgCjxPjZd3Ez30G-23veIGRoGuWHm59v9E4tpw/viewform?embedded=true"
          height="750"
          width="100%"
          style={{
            borderRadius: '10px',
            overflow: 'hidden',
            border: 'none',
            boxShadow: '0 4px 8px rgba(0, 0, 0.1, 0.2)',
          }}
          title="Google Form"
        >
          読み込んでいます…
        </iframe>
      </Container>
    </Container>
  )
}

const styles = {
  outerFrame: {
    padding: '20px',
    border: '1px solid #ccc',
  },
  iframe: {
    boxSizing: 'border-box',
  },
}

export default FrequentQuestion
