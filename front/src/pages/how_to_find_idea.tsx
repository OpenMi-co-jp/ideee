import {
  Button,
  Center,
  Container,
  Grid,
  Text,
  Title,
  Image,
  Group,
  Flex,
  Paper,
  List,
  Anchor,
} from '@mantine/core'
import { ColorsComponent } from '@/components/footDesignComponent/colorsComponent'
import Link from 'next/link'
import { FC, ReactNode } from 'react'
import { HeadBlock } from '@/pages-layout/Head'

// TODO: 画像をS3にアップロードしてファイルとして持たない
const HowToFindIdea = () => {
  const TextBox: FC<{ children: ReactNode; style?: React.CSSProperties }> = ({
    children,
    style,
  }) => (
    <Paper
      shadow="lg"
      radius="md"
      p="lg"
      my="md"
      style={{ backgroundColor: '#F9F9F9', ...style }}
    >
      {children}
    </Paper>
  )

  return (
    <>
      <HeadBlock
        pageTitle="アイデアの探し方"
        pageDescription="個人開発のアイデアを見つけるヒントをご紹介。何を作れば良いか分からない方へのガイドです。"
        pagePath="https://ideee.tech/how_to_find_idea"
        pageKeywords="アイデア,探し方,個人開発,プロダクト,ヒント,見つけ方"
      />
      <Container my="6rem">
        <Title order={1} fw="revert" mb="xl">
          アイデアの探し方💡
        </Title>
      <Text>
        趣味で個人開発をしたい、自分でプロダクトを開発してリリースしたい。
        <br />
        けど何を作って良いか分からなくて困っている人は多いはずです。
        <br />
        このページはそんな人のためにアイデアを探すヒントをご紹介します。
      </Text>

      <Grid my="8rem" gutter="xl">
        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
          <Image
            mt="1rem"
            mx="2rem"
            fit="contain"
            h="21rem"
            p="1rem"
            src="/img/1_man_reading_material.webp"
            alt="資料を読む男性"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
          <Title order={2} fw="revert">
            この記事のターゲット
          </Title>
          <TextBox>
            ・アプリのアイデアが思いつかない人
            <br />
            ・以前作ったアプリに物足りなさを感じている人
            <br />
            ・他の人がどうやってアイデアを出しているか気になる人
          </TextBox>
        </Grid.Col>
        <Grid.Col>
          <Title order={2} fw="revert">
            アイデアを出すときにありがちな勘違い
          </Title>
          <TextBox>
            いざアイデアを出そうと思っても何から考えればいいか分からず、思いついてもありきたりでチープな物しか思いつかない。
            <br />
            <br />
            しかし周りには次々と画期的なアイデアを生み出せる人もいてそういった人は天才なのではと思って考える事が億劫になってしまう。
          </TextBox>
        </Grid.Col>
      </Grid>
      <Text fz="1.5rem">
        アイデアが出せるのは<b>「発想力がある人のみ」という勘違い</b>
        をしてしまう
      </Text>

      <Group mt="10rem">
        <Title order={2} fw="revert">
          そもそもアイデアとは？
        </Title>
        <Text>
          アイデアを考えるためにはアイデアとはどういった物であるかを理解する事が重要です。
          <br />
          1940年から世界中の人々を魅了し続ける『アイデアの作り方』という書籍があり、その中では以下のようなアイデアに関する原理が書かれています。
          <br />
          <br />
          <Anchor
            href="https://www.amazon.co.jp/gp/product/4484881047"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
              「アイデアの作り方」
            </span>
          </Anchor>
          より
        </Text>

        <Paper
          bg="#fdf8eb"
          py="lg"
          px="lg"
          style={{
            borderLeft: '5px solid orange',
            borderRight: '3px solid white',
          }}
        >
          アイデアが生まれる原理💡
          <br />
          1. アイデアとは既存の要素の組み合わせである。
          <br />
          2.
          既存の要素を組み合わせて新しいものを作りだす才能は、事物の関連性を見つけ出そうとする心の働きに依存することが大きい。
          <br />
        </Paper>
      </Group>

      <Grid my="8rem" gutter="xl">
        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
          <Image
            mt="4rem"
            fit="contain"
            h="19rem"
            p="1rem"
            src="/img/2_man_viewing_data.webp"
            alt="データを見る男性"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
          <Title order={2} fw="revert">
            アイデアを出すときの考え方
          </Title>
          <TextBox style={{ fontWeight: 'bold' }}>
            1. 「アイデアは既存概念の掛け合わせ」だと思う
            <br />
            2.「アイデア出すための必要条件」を意識しよう
            <br />
            3.「アイデアを出す方法」から考えよう
          </TextBox>
        </Grid.Col>
      </Grid>

      <Title order={2} fw="revert">
        1.アイデアは掛け合わせ
      </Title>
      <TextBox>
        <b>全く新しいものは生まなくていい</b>
        <br />
        正しい方法で情報を集め、関連付けするだけでアイデアを生むことが出来る。
        <br />
      </TextBox>

      <Flex direction="column" my="6rem">
        <Title order={2} fw="revert">
          フレームワークに当てはめて考えてみる
        </Title>
        <Title order={3} mt="lg">
          オズボーンのチェックリスト
        </Title>
        <Text mt="0.5rem">
          優れたアイデアを出す有名なフレームワークのひとつ。
          <br />
          既存のアイデアをピックアップしたうえで以下を確認してみると新たなアイデアにつながる可能性があるかも？
          <br />
        </Text>
        <Paper
          mt="1rem"
          bg="#fdf8eb"
          py="lg"
          px="lg"
          style={{
            borderLeft: '5px solid orange',
            borderRight: '3px solid white',
          }}
        >
          <b>転用</b> - 他に使い道はないか？
          <br />
          <b>応用</b> - 何か真似はないか？
          <br />
          <b>変更</b> - 少し捻りを加えるなど、変更してみたらどうか？
          <br />
          <b>拡大</b> - サービスの規模を大きくしてみたらどうか？
          <br />
          <b>縮小</b> - サービスの規模を小さくしてみたらどうか？
          <br />
          <b>代用</b> - 他のものでは代用できないか？
          <br />
          <b>置換</b> - 入れ替えてみたらどうか？
          <br />
          <b>逆転</b> - 逆にして見たらどうか？
          <br />
          <b>結合</b> - 組み合わせて見たらどうか？
          <br />
        </Paper>
      </Flex>

      <Title order={2} fw="revert">
        2.アイデアを出すための必要条件
      </Title>
      <Grid my="8rem" gutter="xl">
        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
          <TextBox>
            <List>
              <List.Item>心身がリラックスした状態を作る</List.Item>
              <List.Item>脳内のメモリーを解放する</List.Item>
              <List.Item>
                マネタイズの方法やサービスパターンを知っておく
              </List.Item>
              <List.Item>情報のインプット量を多くする</List.Item>
              <List.Item>
                日頃からあらゆる事に対して思考する癖をつけるf
              </List.Item>
            </List>
          </TextBox>
          <Title order={3}>リラックスした状態を作る</Title>
          <TextBox>
            意外と見落としがちですが精神の安定もかなり重要な必要条件です。
            仕事に追われている状態や過度なストレス下では、頭の中のメモリーが一杯に、、、
            <br />
            そのような状態で質の高い思考をするのは困難になります。
            <br />
            豊かで柔軟な発想力を働かせるためには心身をリラックスさせることが大切です。
          </TextBox>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
          <Image
            ml="2rem"
            mt="3rem"
            fit="contain"
            h="20rem"
            p="2rem"
            pr="5rem"
            src="/img/3_woman_playing_with_a_cat.webp"
            alt="猫と戯れる女性"
          />
        </Grid.Col>
      </Grid>

      <Grid my="8rem" gutter="xl">
        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
          <Image
            ml="2rem"
            mt="3rem"
            fit="contain"
            h="20rem"
            p="2rem"
            pr="5rem"
            src="/img/4_woman_maditating.webp"
            alt="瞑想する女性"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
          <Title order={3}>脳内のメモリーを解放する</Title>
          <TextBox>
            多くの考え事や悩み事、感情を抱える事で脳内は無意識に容量を消費してしまいます。
            <br />
            そのような状態だと質の高い思考に当てる脳内のメモリーが足りず、良質なアイデアを出すのは困難になります。
            <br />
            脳内のメモリーを空けるために一度脳内で考えている事を書き出したりする事で内容が整理され、新たに思考するための脳内の容量を確保し豊かな発想を生むことが出来るようになります。
          </TextBox>
          <Title order={3}>サービスパターンを意識する</Title>
          <TextBox>
            すでにある<b>ビジネスモデルはパターン化されている</b>ので
            ビジネスモデルを知っておく事もアイデアを出す上での必要条件です。
            <br />
            <br />
            <Anchor
              fw="bold"
              href="https://honto.jp/netstore/pd-book_03505830.html"
              target="_blank"
            >
              ビジネスモデル設計書
            </Anchor>
            <br />
            ビジネスモデルは体系化されているので、書籍からも十分な知識が得られます。
            <br />
            <br />
            <Anchor
              fw="bold"
              href="https://www.flierinc.com/summary/325"
              target="_blank"
            >
              ビジネスモデル全史
            </Anchor>
            <br />
            既存で成功しているビジネスモデルがどのように進化していったかを知ると、成功するために必要な共通項を理解できて良好なサービスアイデアを出すためのヒントとなるかもしれません。
          </TextBox>
        </Grid.Col>
      </Grid>

      <Grid my="8rem" gutter="xl">
        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
          <Title order={3}>情報をたくさん仕入れる</Title>

          <TextBox>
            <List>
              <List.Item>フリーミアムモデル</List.Item>
              <List.Item>マッチングモデル</List.Item>
            </List>
            <br />
            などを意識して、普段使っているサービスを見て見ましょう。サービスがどこでお金を産んでいるか分かると、
            <br />
            <List>
              <List.Item>この広告を打っている理由</List.Item>
              <List.Item>ページの構造の背景</List.Item>
            </List>
            <br />
            「なぜこのボタンが大きいか、どんな印象を持たせようとしているのか？」など実装内容の理由が理解出来るようになります。
          </TextBox>
          <Title order={3}>日頃から考える癖をつける</Title>
          <TextBox>
            <List>
              <List.Item>
                アイデアは突然出てくるものではなく、日頃の思考の積み上げ
              </List.Item>
              <List.Item>
                サービスの背景や人の需要を考えるとより具体的なアイデアが浮かぶ
              </List.Item>
              <List.Item>
                出てきた細かなアイデアを<b>必ずメモ</b>しておく事が大切
              </List.Item>
            </List>
          </TextBox>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
          <Paper
            style={{
              borderLeft: '5px solid orange',
              borderRight: '3px solid white',
            }}
            py="0.5rem"
            px="1rem"
            my="2rem"
          >
            <b>カラーパス効果</b>
            <br />
            ある一つのことを意識することで、それに関する情報が無意識に自分の手元にたくさん集まるようになる現象のこと。
          </Paper>
          <Image
            ml="3rem"
            mt="3rem"
            fit="contain"
            h="20rem"
            p="1rem"
            pr="4rem"
            src="/img/5_woman_looking_tree.webp"
            alt="木を見る女性"
          />
        </Grid.Col>
      </Grid>

      <Title order={2} fw="revert" mb="lg">
        3.アイデアを出す方法
      </Title>

      <Grid my="8rem" gutter="xl">
        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
          <Title order={3}>自分に聞いてみる</Title>
          <TextBox>
            人は作りたいもの、やりたいことよりも
            <b>やりたくないものの方が簡単に言語化出来る</b>。
          </TextBox>
          <Title order={3}>人に聞いてみる</Title>
          <TextBox>
            一人で触れられる情報には限りがある。
            <br />
            数多くの人生からえられた経験や趣向から、たくさんのアイデアが得られる。
          </TextBox>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
          <Group mt="5rem">
            <Title order={2}>例）自分のやりたくないアイデア</Title>
            <TextBox>
              アイデア出しの方法として、先にやらない事を決めてしまう事で採用するアイデアの選定をスムーズに行うことが出来ます。
              以下は、やらない事を事前に書き出した例です。
            </TextBox>
            <Image
              src="/img/list_of_unimplemented_ideas.webp"
              fit="contain"
              alt="やらない事リスト"
            />
          </Group>
        </Grid.Col>
      </Grid>

      <Title order={2} fw="revert">
        4.使えるAPIから逆算する
      </Title>
      <Grid my="8rem" gutter="xl">
        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
          <Title order={3}>APIはアイデアの宝庫</Title>
          <TextBox>
            スピード感のあるサービス開発を行う上でAPIの活用は不可欠である。世の中に存在するAPIはどんなものがあるか先にを知っておいてそこから逆算する事でスムーズにサービスのアイデア出しに繋げられる。
            <br />
            <br />
            例えば、
            <Anchor
              fw="bold"
              href="https://connpass.com/about/api/"
              target="_blank"
            >
              connpass
            </Anchor>
            <br />
            connpass APIを使って作られたアプリたちが紹介されている。
            <br />
            アイデアを応用してる例がたくさん見られて参考になる。
          </TextBox>
          <Image
            src="/img/list_of_api_services.webp"
            fit="cover"
            alt="connpass APIを使って作られたアプリ達"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
          <Title order={3}>他にも使えるAPIは沢山ある🚀</Title>
          <TextBox>
            <Anchor
              fw="bold"
              href="https://developers.google.com/youtube/v3/docs?hl=ja"
              target="_blank"
            >
              Google Youtube Data API
            </Anchor>
            <br />
            すでに盛り上がっているので注目されやすく、個人で入ってもお金になりやすい市場。
            <br />
            <br />
            <Anchor
              fw="bold"
              href="https://developers.line.biz/ja/docs/messaging-api/overview/"
              target="_blank"
            >
              LINE Messeaging API
            </Anchor>
            <br />
            botが作れる上に審査が比較的緩く通りやすい。個人利用でも良いが、ランニングコストがかかるためお金を生みにくい。
            <br />
            むしろ企業に対してbot制作代行サービスをしても良さそう。
            <a>(事例)</a>
            <br />
            <br />
            <Anchor
              fw="bold"
              href="https://affiliate.dmm.com/api/"
              target="_blank"
            >
              DMM Webサービス
            </Anchor>
            <br />
            プロユーザーのあなたに必見な情報。女優検索などができるこのAPIはアフィリエイトにもなっており、クリックでお金を生む仕組みがすでに出来上がっているのでアイデア勝負。
            <br />
            <br />
            <Anchor
              fw="bold"
              href="https://kabucom.github.io/kabusapi/reference/index.html"
              target="_blank"
            >
              kabuステーション® API
            </Anchor>
            <br />
            お金を稼ぐといえば株。APIで自由な売買を行いたい場合にピッタリ！
            <br />
            他のAPIと連携させて、独自の切り口で一攫千金を狙えるかもしれません。※利益が出るかはご自身の責任で行ってください笑
            <br />
            <br />
            <Anchor fw="bold" href="https://microcms.io/" target="_blank">
              microCMS
            </Anchor>
            <br />
            副業などでよく聞くのがブログ。
            <br />
            そんなブログもエンジニアなら作る側に回るのも良さそう。
            <br />
            このAPIは、どんなアプリでも簡単にブログ機能を搭載して管理できるAPIなので、自動投稿もできそう。
            <br />
            <br />
            <Anchor
              fw="bold"
              href="https://developers.google.com/calendar?hl=ja"
              target="_blank"
            >
              Google calender API
            </Anchor>
            <br />
            カレンダーのあるアプリなどに入れておくと、カレンダーユーザーからは好かれる。
            <Anchor>管理者</Anchor>はUXが飛躍的に向上した体験あり。
          </TextBox>
        </Grid.Col>
      </Grid>

      <Flex direction="column">
        <Title order={3} mt="4.5rem">
          まとめ
        </Title>
        <TextBox>
          アイデア出し = スキル ≠ 才能
          <br />
          日頃から視野を広げてアイデア探しをすれば、既存のモノから簡単に新しいアイデアを生み出せる！
        </TextBox>
        <Title order={4} mt="2rem">
          インプットが大切
        </Title>
        <Text mb="lg">
          ideeeは、もったいないを無くし「誰かの役に立つもの」を増やすために作られています。
          <br />
          アイデアが思いつく人、アイデアを形にできる人。それぞれが才能です。「作ったけど需要がなくて使われない」「アイデアは面白いけどリソースがなくて作れない」才能たちをマッチさせることによって、そんな機会損失を少しでも無くしていけると考えています。
          <br />
          改善を見つける才能・開発の才能をぜひ活かしましょう!!
        </Text>
      </Flex>

      <Center>
        <Link href="/">
          <Button bg="#ff862e">最新のアイデアを見る</Button>
        </Link>
      </Center>
      <ColorsComponent />
      </Container>
    </>
  )
}
export default HowToFindIdea
