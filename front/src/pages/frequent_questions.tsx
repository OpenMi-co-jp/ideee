import {
  Button,
  Container,
  Text,
  Title,
  Accordion,
  useMantineTheme,
  rem,
  Paper,
  Code,
  List,
  Mark,
  Anchor,
} from '@mantine/core'
import {
  IconBulb,
  IconFlag,
  IconUsers,
  IconWorld,
  IconDoorExit,
} from '@tabler/icons-react'
import Link from 'next/link'
const FrequentQuestions = () => {
  const theme = useMantineTheme()
  const getColor = (color: string) =>
    theme.colors[color][theme.colorScheme === 'dark' ? 4 : 8]

  return (
    <Container>
      <Title order={1} m="lg">
        よくある質問
      </Title>

      <Accordion variant="separated">
        <Accordion.Item value="bulb">
          <Accordion.Control
            icon={<IconBulb size={rem(20)} color={getColor('red')} />}
          >
            アイデアはどうやって探したらいいの？
          </Accordion.Control>
          <Accordion.Panel m="md">
            <Text mb="lg">
              リラックスした状態で
              <br />
              身の回りで困っていることやもったいないことアプリで楽になった経験なんかを思い出してみると
              <br />
              意外とアイデアは出てくるかも💡
            </Text>
            <Button
              leftIcon={<IconBulb />}
              variant="gradient"
              gradient={{ from: 'orange', to: 'red' }}
            >
              {/* TODO: アイデアの出し方のページを作成後URLの変更 */}
              <Link href="https://qiita.com/naruqiita/items/65d3560e3bf8a88e80ac">
                アイデアの出し方
              </Link>
            </Button>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="flag">
          <Accordion.Control
            icon={<IconFlag size={rem(20)} color={getColor('blue')} />}
          >
            Contributionsとは？
          </Accordion.Control>
          <Accordion.Panel m="md">
            <Text>
              Contribution（コントリビューション）とはideeeでの貢献度を表しています！
            </Text>
            <Text fw={500} my="sm">
              計算方法
            </Text>
            <Code block color="blue">
              アイデア投稿 ✖️ 2p
              <br />
              自分のアイデアに対してのハート数 ✖️ 1p
              <br />
              アイデアに対してのハートを送った数 ✖️ 0.5p
              <br />
              自分のアイデアに対してへのコメント数 ✖️ 1p
            </Code>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="users">
          <Accordion.Control
            icon={<IconUsers size={rem(20)} color={getColor('teal')} />}
          >
            チーム開発募集機能でできることは？
          </Accordion.Control>
          <Accordion.Panel m="md">
            <Text>現在の機能</Text>
            <Code block color="blue">
              <List>
                <List.Item>チーム開発の募集条件を設定</List.Item>
                <List.Item>チームリストの作成</List.Item>
                <List.Item>
                  参加メンバーだけがみることができるチャットスペース
                </List.Item>
                <List.Item>アイデアが注目されやすくなる</List.Item>
              </List>
            </Code>
            <Text>今後の機能</Text>
            <Code block color="blue">
              <List>
                <List.Item>オーナーごとの審査制にする</List.Item>
                <List.Item>GitHub APIなどを利用した開発連携機能</List.Item>
                <List.Item>
                  開発の軌跡を記録して、開発ストーリーを記事化
                </List.Item>
              </List>
            </Code>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="world">
          <Accordion.Control
            icon={<IconWorld size={rem(20)} color={getColor('blue')} />}
          >
            X(旧Twitter)IDを登録するとどうなる？
          </Accordion.Control>
          <Accordion.Panel m="md">
            <Text mb="md">アイデアがより注目されます！</Text>
            <Text fw={600}>自動ツイート機能</Text>
            <Code block color="blue">
              <List>
                <List.Item>
                  アイデアを投稿すると
                  <Anchor href="https://twitter.com/ideee_tech" target="_blank">
                    公式 X アカウント
                  </Anchor>
                  でアイデアをツイート
                </List.Item>
                <List.Item>上記のツイートであなたのX IDをメンション</List.Item>
                <List.Item>メンションが通知として役立ち、拡散！</List.Item>
                <List.Item>
                  紐づいたあなたの X アカウントも注目されます
                </List.Item>
              </List>
            </Code>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="doorExit">
          <Accordion.Control
            icon={<IconDoorExit size={rem(20)} color={getColor('yellow')} />}
          >
            退会方法は？
          </Accordion.Control>
          <Accordion.Panel m="md">
            <Text>
              ページ下部の{' '}
              <Mark color="gray">ideeeに対しての質問 or コメント</Mark>{' '}
              に退会したい旨をお伝えください。
              <br />
              また、その際に<Mark color="lime">退会理由</Mark>と
              <Mark color="lime">ユーザー名</Mark>
              も指定してお伝えくださると幸いです。
              <br />
              担当者が3営業日以内に対応致します。
            </Text>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      <Paper mt="xl" py="lg">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSfZGyqfRpT0UgCjxPjZd3Ez30G-23veIGRoGuWHm59v9E4tpw/viewform?embedded=true"
          height="1250"
          width="100%"
          style={{
            overflow: 'hidden',
            border: 'none',
            marginTop: '4rem',
          }}
          title="Google Form"
        >
          読み込んでいます…
        </iframe>
      </Paper>
    </Container>
  )
}

export default FrequentQuestions
