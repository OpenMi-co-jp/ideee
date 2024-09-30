import {
  Accordion,
  Container,
  Flex,
  Title,
  Text,
  Box,
  Center,
  Button,
} from '@mantine/core'
import { TwitterTimeline } from './_components/TwitterTimeline'
import { Tweet } from './_components/Tweet'
import Link from 'next/link'
import { handleSignIn } from '@/components/Auth/OmniAuth/hooks'
import { useCallback } from 'react'
import { useFetchCsrfToken } from '@/utils/auth/useFetchCsrfToken'
import { useCurrentUser } from '@/context/CurrentUserContext'

const linkStyle = {
  color: '#0070f3',
  textDecoration: 'underline',
  fontWeight: 'bold',
}

export default function Sentry() {
  const csrfToken = useFetchCsrfToken()
  const onTwitterLogin = useCallback(() => {
    if (csrfToken) {
      handleSignIn({ provider: 'twitter', authenticity_token: csrfToken })
    }
  }, [csrfToken])
  const { currentUser } = useCurrentUser()

  return (
    <Container size="sm">
      <Flex direction="column" gap="lg">
        {/* 画像設定 */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 0,
            paddingTop: '56.25%',
            paddingBottom: 0,
            boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
            marginTop: '1.6em',
            marginBottom: '0.9em',
            overflow: 'hidden',
            borderRadius: '8px',
            willChange: 'transform',
          }}
        >
          <iframe
            loading="lazy"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              border: 'none',
              padding: 0,
              margin: 0,
            }}
            src="https://www.canva.com/design/DAGRqa6n7Pk/5qNZ4A14m0ImLBVT3xStlQ/view?embed"
            allow="fullscreen"
          ></iframe>
        </div>

        {/* イベント説明 */}
        <Title ta="center">イベント</Title>
        <Accordion
          variant="separated"
          multiple
          defaultValue={['campaign-detail', 'application-period']}
        >
          <Accordion.Item value="campaign-detail" mb="xl">
            <Accordion.Control>キャンペーンの詳細</Accordion.Control>
            <Accordion.Panel>
              <Flex direction="column" gap="lg">
                <Text fw={600}>
                  💡ideee ✖️ SentryJapanとのコラボキャンペーン🎃
                </Text>
                <Text>
                  Amazonギフトコード5000円~1000分をプレゼント（合計10000円分）
                </Text>
                <Text>
                  ■ 応募方法 📮
                  <br />
                  【１】
                  <Link
                    href="https://x.com/intent/follow?original_referer=http%3A%2F%2Flocalhost%3A3000%2F&screen_name=SentryJapan"
                    style={linkStyle}
                  >
                    Sentry Japan（@SentryJapan）
                  </Link>
                  をフォロー
                  <br />
                  【２】対象のキャンペーン投稿をリポスト
                  <br />
                </Text>
                <Text>
                  ■ 当選確率アップポイント 🚀
                  <br />
                  【１】 アプリ(ideee)登録された方
                  <br />
                  【２】アイデアを投稿された方
                  <br />
                  【３】アイデアにハートを送信された方
                  <br />
                </Text>
                <Text>
                  ■ キャンペーン期間 ⏰<br />
                  2024年10月1日(火) ～ 10月31日(木)
                </Text>
              </Flex>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="campaign-detail" mb="xl">
            <Accordion.Control>応募の流れ</Accordion.Control>
            <Accordion.Panel>
              <Flex direction="column" gap="lg" align="center">
                <Flex gap="sm">
                  <a
                    href="https://twitter.com/SentryJapan?ref_src=twsrc%5Etfw"
                    className="twitter-follow-button"
                    data-size="large"
                    data-lang="ja"
                    data-dnt="true"
                    data-show-count="false"
                  >
                    Follow @SentryJapan
                  </a>
                  <script
                    async
                    src="https://platform.twitter.com/widgets.js"
                    char-set="utf-8"
                  ></script>
                  して
                </Flex>

                <Text>↓↓↓このポストをリポスト</Text>
                <Center>
                  <Box style={{ width: '600px' }}>
                    <Tweet id="1840889368292311500" />
                  </Box>
                </Center>
                {!currentUser ? (
                  <Button
                    w="13rem"
                    variant="gradient"
                    gradient={{ from: 'red', to: 'orange' }}
                    onClick={onTwitterLogin}
                  >
                    Xで登録する
                  </Button>
                ) : (
                  <Button
                    variant="gradient"
                    gradient={{ from: 'red', to: 'orange' }}
                  >
                    <Link href="/">アイデアを投稿 or ハートを送る</Link>
                  </Button>
                )}
              </Flex>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="application-period" mb="xl">
            <Accordion.Control>応募期間</Accordion.Control>
            <Accordion.Panel>
              <Text size="md" fw={700}>
                終了時刻
              </Text>
              <Text>2024年10月31日(木) 23時59分</Text>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="application-requirement" mb="xl">
            <Accordion.Control>応募要項</Accordion.Control>
            <Accordion.Panel>
              <Text ta="center" fw={800}>
                よくお読みのうえ、ご応募ください
              </Text>
              <Text size="sm">
                「 ideee
                」が主催するフォロー&リポスト(RT)キャンペーン（当キャンペーン）にご応募いただく前に、本規約をお読みいただき、同意の上ご応募ください。
                本キャンペーンにご応募された場合、本規約にご同意いただいたものとみなします。
                万一、本規約にご同意いただけない場合には、キャンペーンへの応募はご遠慮ください。
              </Text>
              <Text size="md" fw={700}>
                1.応募期間について
              </Text>
              当該キャンペーンの応募期間は、各キャンペーンにより異なります。
              詳しくは当該キャンペーンを開催中の「@SentryJapan」アカウントの投稿をご確認ください。
              やむを得ない事情により、応募期間は予告なく変更となることがあります。
              <Text size="md" fw={700}>
                2.景品について
              </Text>
              期間中に応募された応募者のうち、抽選でAmazonギフトカード（最大5000円相当）を総額1万円分プレゼントいたします。詳しくは当該キャンペーンを開催中の投稿をご確認ください。やむを得ない事情により、景品は予告なく変更となることがあります。
              <Text size="md" fw={700}>
                3.応募方法について
              </Text>
              X(Twitter)上で、「
              @SentryJapan」をフォローしたのち、指定の投稿をリポスト(RT)してください。
              やむを得ない事情により、応募方法は予告なく変更となることがあります。
              X(Twitter)システムのエラー・システム障害等その他やむを得ない事情により、予告なくキャンペーンを途中で中止、終了する場合があります。
              <Text size="md" fw={700}>
                4.応募資格について
              </Text>
              本キャンペーンへのご応募には、X(Twitter)への登録（無料）が必要です。
              X(Twitter)連携して、「 @SentryJapan
              」をフォローしたのち、指定の投稿をリポスト(RT)することで応募可能になります。
              複数のX(Twitter)アカウントで応募された場合、当選資格を無効とさせていただきます。
              未成年の方は、親権者の方が応募規約に同意いただいた上でキャンペーンの応募をお願いいたします。
              <Text size="md" fw={700}>
                5.当選について
              </Text>
              本キャンペーン応募ページにてその場で結果が表示されます。
              当選の際には、景品送付のために必要な情報をフォームに入力いただきます。
              当選者にご提供いただいたこれらの情報を景品送付、および景品送付に必要な諸連絡のためにのみ使用し、その他の目的には一切使用いたしません。
              当選後、応募期間内に必要な情報をご提供いただけない場合、当選を無効とさせていただきますのでご注意ください。
              またご提供情報に誤りがあるために景品を送付できない場合（誤送信された場合を含みます）、当選を無効とさせていただきますのでご注意ください。なお、無効となった当選が発生した場合や応募者数が想定よりも少なかった場合などに、当選人数は上記記載の数に達しないことがあります。
              システムの問題により、誤って当選が表示された場合、当選が取り消される可能性があります。
              <Text size="md" fw={700}>
                6.当キャンペーンに関するお問い合わせ先
              </Text>
              ideee運営チーム(連絡先)までお願いいたします。本キャンペーンはideee運営チームによる提供です。本キャンペーンについてのお問い合わせはAmazonではお受けしておりません。
              ※抽選方法、当落結果、景品についてのお問い合わせは受け付けておりません。
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>

        {/* ツイッタータイムライン */}
        <TwitterTimeline href="https://twitter.com/SentryJapan?ref_src=twsrc%5Etfw" />
      </Flex>
    </Container>
  )
}
