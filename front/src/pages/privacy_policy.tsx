import { Container, Paper, Text, Title, List } from '@mantine/core'
import { HeadBlock } from '@/pages-layout/Head'

export default function PrivacyPolicy() {
  return (
    <>
      <HeadBlock
        pageTitle="プライバシーポリシー"
        pageDescription="ideeeのプライバシーポリシーです。個人情報の取り扱いについてご確認ください。"
        pagePath="https://ideee.tech/privacy_policy"
        pageKeywords="ideee,プライバシーポリシー,個人情報,プライバシー"
      />
      <Container>
      <Paper shadow="xs" p="xl">
        <Title order={1} mt="xl">
          プライバシーポリシー
        </Title>

        <Text mt="md">
          本プライバシーポリシー（以下「本ポリシー」といいます。）は、本ウェブサイト上で提供するエンジニアとアイデアをつなぐプラットフォームのWebアプリ（以下「本サービス」といいます。）において、利用者の個人情報およびプライバシー情報の取扱いについて定めるものです。本サービスを利用される方（以下「登録ユーザー」といいます。）は、本ポリシーに同意の上で、本サービスをご利用ください。
        </Text>

        <Title order={2} mt="xl">
          第1条（プライバシー情報の定義）
        </Title>
        <Paper shadow="md" radius="xs" py="lg" px="xs">
          <Text>
            本ポリシーにおける「個人情報」とは、個人情報保護法に定める「個人情報」を指し、生存する個人に関する情報であって、氏名、メールアドレス、その他の記述等により特定の個人を識別できる情報を指します。
          </Text>
          <Text mt="md">
            また、「履歴情報および特性情報」とは、個人情報以外のものであり、利用したサービスや閲覧したページ、広告の履歴、検索キーワード、利用日時、利用方法、利用環境、IPアドレス、Cookie、端末の個体識別情報などを指します。
          </Text>
        </Paper>

        <Title order={2} mt="xl">
          第2条（プライバシー情報の収集方法）
        </Title>
        <Paper shadow="md" radius="xs" py="lg" px="xs">
          <Text>
            運営者は、登録ユーザーが利用登録をする際に、メールアドレス等の個人情報をお尋ねすることがあります。また、利用者が本サービスを利用する過程で、利用履歴やアクセス情報などの履歴情報および特性情報を収集します。
          </Text>
          <Text mt="md">
            Cookieや類似の技術を使用して、利用者のサービス利用状況や設定情報を収集する場合があります。Cookieの受け入れを拒否した場合、一部の機能が利用できない場合があります。
          </Text>
        </Paper>

        <Title order={2} mt="xl">
          第3条（個人情報を収集・利用する目的）
        </Title>
        <Paper shadow="md" radius="xs" py="lg" px="xs">
          <Text>
            運営者が個人情報を収集・利用する目的は、以下のとおりです。
          </Text>
          <List mt="md">
            <List.Item>本サービスの提供・運営のため</List.Item>
            <List.Item>登録ユーザーの本人確認や不正利用防止のため</List.Item>
            <List.Item>登録ユーザーからのお問い合わせに対応するため</List.Item>
            <List.Item>サービスの改善や新機能の開発のため</List.Item>
            <List.Item>広告やコンテンツのパーソナライズのため</List.Item>
            <List.Item>利用規約や法令に違反する行為への対応のため</List.Item>
            <List.Item>その他、上記の利用目的に付随する目的のため</List.Item>
          </List>
        </Paper>

        <Title order={2} mt="xl">
          第4条（個人情報の安全管理措置）
        </Title>
        <Paper shadow="md" radius="xs" py="lg" px="xs">
          <Text>
            運営者は、個人情報の漏洩、紛失、毀損を防止するために、適切な安全管理措置を講じます。
          </Text>
        </Paper>

        <Title order={2} mt="xl">
          第5条（個人情報の第三者提供）
        </Title>
        <Paper shadow="md" radius="xs" py="lg" px="xs">
          <Text>
            運営者は、以下の場合を除き、事前の同意なく個人情報を第三者に提供しません。
          </Text>
          <List mt="md">
            <List.Item>法令に基づく場合</List.Item>
            <List.Item>
              人の生命、身体または財産の保護のために必要な場合
            </List.Item>
            <List.Item>
              公衆衛生の向上や児童の健全な育成の推進のために特に必要な場合
            </List.Item>
            <List.Item>
              国の機関や地方公共団体の法令に定める事務への協力が必要な場合
            </List.Item>
            <List.Item>事前に通知し同意を得た場合</List.Item>
          </List>
          <Text mt="md">また、以下の場合は第三者提供に該当しません。</Text>
          <List mt="md">
            <List.Item>
              運営者が利用目的の達成に必要な範囲で個人情報の取扱いを委託する場合
            </List.Item>
            <List.Item>事業の承継に伴って個人情報が提供される場合</List.Item>
          </List>
        </Paper>

        <Title order={2} mt="xl">
          第6条（個人情報の開示・訂正・利用停止等）
        </Title>
        <Paper shadow="md" radius="xs" py="lg" px="xs">
          <Text>
            登録ユーザーは、運営者に対して、自己の個人情報の開示、訂正、追加、削除、利用停止、第三者提供の停止を求めることができます。これらの請求があった場合、運営者は本人確認を行った上で、法令に基づき適切に対応します。
          </Text>
        </Paper>

        <Title order={2} mt="xl">
          第7条（未成年者の個人情報）
        </Title>
        <Paper shadow="md" radius="xs" py="lg" px="xs">
          <Text>
            未成年者が本サービスを利用する場合、必ず法定代理人の同意を得た上でご利用ください。未成年者の個人情報についても、本ポリシーに従って適切に取り扱います。
          </Text>
        </Paper>

        <Title order={2} mt="xl">
          第8条（アクセス解析ツールについて）
        </Title>
        <Paper shadow="md" radius="xs" py="lg" px="xs">
          <Text>
            運営者は、サービスの改善のためにGoogle
            Analyticsなどのアクセス解析ツールを使用する場合があります。これらのツールはデータ収集のためにCookieを使用しますが、データは匿名で収集され、個人を特定するものではありません。
          </Text>
          <Text mt="md">
            詳しくは、各ツールの利用規約やプライバシーポリシーをご確認ください。
          </Text>
        </Paper>

        <Title order={2} mt="xl">
          第9条（プライバシーポリシーの変更）
        </Title>
        <Paper shadow="md" radius="xs" py="lg" px="xs">
          <Text>
            運営者は、必要に応じて本ポリシーを変更することがあります。重要な変更がある場合は、本サービス上での告知または電子メール等で通知いたします。変更後のポリシーは、本サービス上に掲載した時点で効力を生じます。
          </Text>
        </Paper>

        <Title order={2} mt="xl">
          第10条（お問い合わせ窓口）
        </Title>
        <Paper shadow="md" radius="xs" py="lg" px="xs">
          <Text>
            本ポリシーに関するお問い合わせは、以下の窓口までご連絡ください。
          </Text>
          <Text mt="md">
            住所: 〒277-8520 千葉県柏市若柴178番地4 柏の葉キャンパス148概区2
            ショップ&オフィス棟6F
            <br />
            事業者名: Product Engineer
            <br />
            代表者名：塚崎 成寛
            <br />
            メールアドレス： ideee.info@gmail.com
          </Text>
        </Paper>
      </Paper>
      </Container>
    </>
  )
}
