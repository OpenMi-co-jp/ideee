import { Container, Paper, Text, Title, List } from '@mantine/core'

export default function TermsOfService() {
  return (
    <Container>
      <Paper shadow="xs" p="xl">
        <Text>
          本利用規約（以下「本規約」といいます。）は、本ウェブサイト上で提供するエンジニアとアイデアをつなぐプラットフォームのWebアプリ（以下「本サービス」といいます。）の利用条件を定めるものです。本サービスの利用者（以下「利用者」といいます。）は、本規約に同意の上で、本サービスをご利用ください。
        </Text>

        <Title order={2} mt="xl">
          第１条（規約の適用）
        </Title>
        <Paper shadow="md" radius="xs" py="lg" px="xs">
          本規約は、本サービスの提供条件および本サービス運営者（以下「運営者」といいます。）と利用者との間の権利義務関係を定めることを目的とし、本サービスの利用に関わる一切の関係に適用されます。
        </Paper>

        <Title order={2} mt="xl">
          第２条（利用資格）
        </Title>
        <Paper shadow="md" radius="xs" py="lg" px="xs">
          本サービスは、以下の条件をすべて満たす方に限り、ご利用いただけます。
          <br />
          <br />
          <List type="ordered">
            <List.Item>
              自身でインターネットの利用環境、端末、ソフトウェアなどを用意できる方。
            </List.Item>
            <List.Item>本規約に同意し、遵守できる方。</List.Item>
            <List.Item>過去に本規約に違反したことのない方。</List.Item>
            <List.Item>
              満13歳以上の方。未成年者（20歳未満の方）は、法定代理人の同意を得ていること。
            </List.Item>
          </List>
        </Paper>

        <Title order={2} mt="xl">
          第３条（利用者メールアドレスおよびパスワードの管理）
        </Title>
        <Paper shadow="md" radius="xs" py="lg" px="xs">
          <List>
            <List.Item>
              利用者は、自己の責任において、メールアドレスおよびパスワード等を適切に管理・保管するものとします。
            </List.Item>
            <List.Item>
              利用者は、いかなる場合も、アカウントを第三者に譲渡、貸与、共有することはできません。
            </List.Item>
            <List.Item>
              メールアドレスやパスワードの管理不十分、使用上の過誤、第三者の使用等によって生じた損害または不利益について、運営者は一切の責任を負いません。
            </List.Item>
          </List>
        </Paper>

        <Title order={2} mt="xl">
          第４条（禁止事項）
        </Title>
        <Paper shadow="md" radius="xs" py="lg" px="xs">
          利用者は、本サービスの利用にあたり、以下の行為をしてはなりません。
          <br />
          <br />
          <List type="ordered">
            <List.Item>法令または公序良俗に違反する行為。</List.Item>
            <List.Item>犯罪行為に関連する行為。</List.Item>
            <List.Item>
              運営者のサーバーまたはネットワークの機能を破壊、妨害する行為。
            </List.Item>
            <List.Item>
              本サービスの運営を妨害する行為、またはその恐れのある行為。
            </List.Item>
            <List.Item>
              他者の個人情報を無断で収集、利用、提供する行為。
            </List.Item>
            <List.Item>他者になりすます行為。</List.Item>
            <List.Item>
              反社会的勢力に対して直接または間接に利益を供与する行為。
            </List.Item>
            <List.Item>
              運営者、他の利用者、第三者の知的財産権、肖像権、プライバシー、名誉、その他の権利または利益を侵害する行為。
            </List.Item>
            <List.Item>
              不正な手段で本サービスのコンテンツにアクセスする行為。
            </List.Item>
            <List.Item>虚偽の情報を投稿する行為。</List.Item>
            <List.Item>
              スパム行為（機械的に生成された文章の投稿、同一内容の繰り返し投稿など）。
            </List.Item>
            <List.Item>
              過度に暴力的、露骨な性的表現、差別的表現、自殺・自傷行為・薬物乱用を誘引または助長する表現、他人に不快感を与える表現の投稿。
            </List.Item>
            <List.Item>
              性的な目的での利用、面識のない異性との出会いや交際を目的とする行為、他者への嫌がらせや誹謗中傷。
            </List.Item>
            <List.Item>宗教活動または宗教団体への勧誘行為。</List.Item>
            <List.Item>
              広告やアフィリエイトに関連する不正行為（クリック詐欺、虚偽情報の提供、不適切な方法による広告収入の取得など）。
            </List.Item>
            <List.Item>その他、運営者が不適切と判断する行為。</List.Item>
          </List>
          <br />
          違反が発覚した場合、運営者は当該コンテンツの削除、アカウントの停止・削除などの措置を取ることができます。
          <br />
        </Paper>

        <Title order={2} mt="xl">
          第５条（本サービスの提供の停止等）
        </Title>
        <Paper shadow="md" radius="xs" py="lg" px="xs">
          運営者は、以下のいずれかの事由がある場合、利用者に事前通知することなく本サービスの全部または一部の提供を停止または中断することができます。
          <br />
          <br />
          <List type="ordered">
            <List.Item>システムの保守点検や更新を行う場合。</List.Item>
            <List.Item>
              地震、落雷、火災、停電、天災などの不可抗力により提供が困難な場合。
            </List.Item>
            <List.Item>
              コンピュータや通信回線等が事故により停止した場合。
            </List.Item>
            <List.Item>利用しているクラウドサービスが停止した場合。</List.Item>
            <List.Item>その他、運営者が提供が困難と判断した場合。</List.Item>
          </List>
          <br />
          これにより生じた損害または不利益について、運営者は一切の責任を負いません。
          <br />
        </Paper>

        <Title order={2} mt="xl">
          第6条（著作権および知的財産権）
        </Title>
        <Paper shadow="md" radius="xs" py="lg" px="xs">
          <List>
            <List.Item>
              本サービスに関する全ての著作権および知的財産権は、運営者または正当な権利を有する第三者に帰属します。
            </List.Item>
            <List.Item>
              利用者は、権利者の許諾を得たコンテンツのみを投稿・編集できます。
            </List.Item>
            <List.Item>
              利用者が投稿したコンテンツの著作権は利用者または既存の権利者に留保されますが、運営者は本サービスの運営、改善、宣伝のために無償で利用できるものとし、利用者はこれに同意します。
            </List.Item>
            <List.Item>
              利用者および第三者は、権利者の許可なくコンテンツを無断転載・二次配布できません。
            </List.Item>
          </List>
        </Paper>

        <Title order={2} mt="xl">
          第7条（広告およびアフィリエイト）
        </Title>
        <Paper shadow="md" radius="xs" py="lg" px="xs">
          <List>
            <List.Item>
              運営者は、第三者の広告やアフィリエイトリンクを本サービス上に掲載できます。
            </List.Item>
            <List.Item>
              利用者は、広告の内容および取引について自己責任で判断・利用するものとします。
            </List.Item>
            <List.Item>
              運営者は、広告の内容および取引に関して一切の責任を負いません。
            </List.Item>
          </List>
        </Paper>

        <Title order={2} mt="xl">
          第8条（損害賠償責任）
        </Title>
        <Paper shadow="md" radius="xs" py="lg" px="xs">
          利用者が本規約に違反し、運営者に損害を与えた場合、運営者は当該利用者に対して損害賠償を請求できるものとします。
        </Paper>

        <Title order={2} mt="xl">
          第9条（退会および登録抹消）
        </Title>
        <Paper shadow="md" radius="xs" py="lg" px="xs">
          <List>
            <List.Item>利用者は、アカウントを削除（退会）できます。</List.Item>
            <List.Item>
              利用者が本規約に違反した場合、運営者は事前通知なくアカウントの削除・登録抹消を行うことができます。
            </List.Item>
            <List.Item>
              退会や登録抹消により生じた損害または不利益について、運営者は一切の責任を負いません。
            </List.Item>
          </List>
        </Paper>

        <Title order={2} mt="xl">
          第10条（保証の否認および免責事項）
        </Title>
        <Paper shadow="md" radius="xs" py="lg" px="xs">
          <List>
            <List.Item>
              運営者は、本サービスに瑕疵（安全性、信頼性、正確性、完全性、有効性、特定目的への適合性、セキュリティ等）がないことを保証しません。
            </List.Item>
            <List.Item>
              本サービスの利用によって生じた損害や不利益について、運営者は一切の責任を負いません。
            </List.Item>
            <List.Item>
              利用者間または利用者と第三者との間で生じた紛争等について、運営者は一切関与せず、責任を負いません。
            </List.Item>
          </List>
        </Paper>

        <Title order={2} mt="xl">
          第11条（サービス内容の変更・終了）
        </Title>
        <Paper shadow="md" radius="xs" py="lg" px="xs">
          <List>
            <List.Item>
              運営者は、利用者に通知することなく、本サービスの内容を変更、追加、停止することができます。
            </List.Item>
            <List.Item>
              運営者は、自己の判断で本サービスの提供を終了することができます。
            </List.Item>
            <List.Item>
              サービスの変更・停止・終了により生じた損害または不利益について、運営者は一切の責任を負いません。
            </List.Item>
          </List>
        </Paper>

        <Title order={2} mt="xl">
          第12条（利用規約の変更）
        </Title>
        <Paper shadow="md" radius="xs" py="lg" px="xs">
          <List>
            <List.Item>
              運営者は、必要と判断した場合、利用者に通知することなくいつでも本規約を変更できます。
            </List.Item>
            <List.Item>
              重要な変更を行う場合は、事前に本サイトまたは電子メールにより利用者に通知します。
            </List.Item>
            <List.Item>
              規約変更後に本サービスを利用した場合、変更後の規約に同意したものとみなします。
            </List.Item>
          </List>
        </Paper>

        <Title order={2} mt="xl">
          第13条（通知または連絡）
        </Title>
        <Paper shadow="md" radius="xs" py="lg" px="xs">
          運営者から利用者への通知または連絡は、電子メールまたは本サービス内の通知機能を通じて行います。
        </Paper>

        <Title order={2} mt="xl">
          第14条（権利義務の譲渡の禁止）
        </Title>
        <Paper shadow="md" radius="xs" py="lg" px="xs">
          利用者は、運営者の事前の書面による承諾なく、利用契約上の地位や本規約に基づく権利義務を第三者に譲渡または貸与できません。
        </Paper>

        <Title order={2} mt="xl">
          第15条（準拠法および裁判管轄）
        </Title>
        <Paper shadow="md" radius="xs" py="lg" px="xs">
          <List>
            <List.Item>
              本規約の解釈および適用に関しては、日本法を準拠法とします。
            </List.Item>
            <List.Item>
              本サービスに関連して生じた紛争については、千葉地方裁判所または千葉簡易裁判所を第一審の専属的合意管轄裁判所とします。
            </List.Item>
          </List>
        </Paper>
      </Paper>
    </Container>
  )
}
