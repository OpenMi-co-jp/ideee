import {
  Title,
  Text,
  Paper,
  Mark,
  List,
  ThemeIcon,
  Anchor,
  Image,
  Divider,
} from '@mantine/core'
import { IconCircleCheck } from '@tabler/icons-react'

export const HiddenContent = () => {
  return (
    <>
      <Title order={2} my="2rem">
        1.目的がはっきりしていない
      </Title>
      <Image
        height="320"
        fit="contain"
        src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/498701/ea095e32-e192-3ccd-bebd-d2c5e72a6ce7.jpeg"
        alt="個人開発の目的マップ"
      />
      <Text my="xl">
        これはサービス開発における最大にして一番多い落とし穴です。
        <br />
        スタートアップと個人開発で異なる点は、「マネタイズが絶対条件ではない点」です。
        <br />
        個人開発では個人が自分で開発をしたいと思う理由は千差万別なのでまずは「なぜ作るのか？」を明確にしてその目的を見失わないだけで成功体験は得やすくなります。
      </Text>
      <br />
      <Title order={3} my="xl">
        よくある例
      </Title>
      <List spacing="xs" my="lg">
        <List.Item>
          お金儲けしたい目的のアプリに勉強の要素も追加、使ったことの無い言語の多様で工数の増加
        </List.Item>
        <List.Item>
          結果、ローンチ前にやる気がなくなり、時間経過によるアイデアの頓挫
        </List.Item>
        <List.Item>
          技術力をアピールする目的で始めたが、どうせ作るならとバズりたい欲が高まり開発スピードが低下
        </List.Item>
        <List.Item>
          おもしろAPIを使用した簡易的なアプリでバズりを狙いにいってしまう（目的がずれる）
        </List.Item>
      </List>
      <Paper shadow="lg" radius="md" p="lg" my="md">
        <Title order={3} my="md">
          解決のヒント💡
        </Title>
        <List
          icon={
            <ThemeIcon color="teal" size={20} radius="xl">
              <IconCircleCheck size="1rem" />
            </ThemeIcon>
          }
          spacing="xs"
          my="lg"
        >
          <List.Item>
            <Mark color="yellow">目的は最初に明確化/常に確認</Mark>
            しながら目的ベースで開発することをおすすめします
          </List.Item>
          <List.Item>
            ひとつの目的を完遂することですら難易度は高いことを理解して着実に取り組みましょう
          </List.Item>
        </List>
      </Paper>

      <Title order={3} my="xl">
        例）自分の学習のためのアプリ
      </Title>
      <List spacing="xs" my="lg">
        <List.Item>
          作ったアプリを長くメンテナンスをすることが一番の学び
        </List.Item>
        <List.Item>一定数ユーザーがいてロングランできることが必要</List.Item>
        <List.Item>お金をたくさんかけられないが、UXを下げられない</List.Item>
      </List>

      <Title order={3} my="xl">
        自己成長が目的の場合
      </Title>
      <List spacing="xs" my="lg">
        <List.Item>成長のために戦略を立てる</List.Item>
        <List.Item>
          まず到達したいゴールを設定してそこに行き着くまでに現時点で何をすべきかを洗い出す
        </List.Item>
        <List.Item>
          時間や労力をかけても何を得て、どんな道が広がるか、どうなりたいかまで見据えておきたい
        </List.Item>
      </List>
      <Text>
        <Mark color="gray">戦略があればムリ・ムラ・ムダが減る</Mark>
      </Text>

      <Divider my="3rem" />

      <Title order={2} my="2rem">
        2.車輪の再発明（類似サービス）
      </Title>
      <Text my="xl">
        大きく二つあり、
        <List spacing="xs" my="lg">
          <List.Item>市場調査をせずにコンセプトが同じサービスを作る</List.Item>
          <List.Item>類似サービスを気にし過ぎて作らない</List.Item>
        </List>
        があります。
      </Text>
      <Paper shadow="lg" radius="md" p="lg" my="md">
        <Title order={3} my="md">
          解決のヒント💡
        </Title>
        <List
          icon={
            <ThemeIcon color="teal" size={20} radius="xl">
              <IconCircleCheck size="1rem" />
            </ThemeIcon>
          }
          spacing="xs"
          my="lg"
        >
          <List.Item>サービスのペルソナを設定</List.Item>
          <List.Item>
            課題に対して現在どんな代替え対応をしているかを調査
          </List.Item>
          <List.Item>
            ユーザーストーリーの仮説を立てる中で既存のサービスなどで対応できていない点があれば、サービスとしての差分になることを理解する
          </List.Item>
        </List>
      </Paper>

      <Divider my="3rem" />

      <Title order={2} my="2rem">
        3.いつの間にか「高機能なもの」を作ることが目的になる
      </Title>
      <Text my="xl">
        ユーザーが欲しいものではなく、自分が作れるものや作りたいものに焦点が当たってフォーカスがずれてしまう状態は個人開発を行う上で技術力のある人などがよく陥りがちな落とし穴です。
        <br />
        高機能は既存の顕在化された軸における延長線でしかないのでまずは格とするユーザーニーズを設定し、そこを最重要事項として開発を進めましょう。
      </Text>

      <Image
        height="320"
        fit="contain"
        src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F498701%2F0736ae79-c883-f76d-40e7-8ab04da954ed.jpeg?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=f40c8e23f2607f7b7b89a93c081899db"
        alt="ドリルの穴の画像"
      />
      <Paper shadow="lg" radius="md" p="lg" my="md">
        <Title order={3} my="md">
          解決のヒント💡
        </Title>
        <List
          icon={
            <ThemeIcon color="teal" size={20} radius="xl">
              <IconCircleCheck size="1rem" />
            </ThemeIcon>
          }
          spacing="xs"
          my="lg"
        >
          <List.Item>
            ユーザーが求めているのは高機能なものではなく、需要にあった「ドリルの穴」であることを忘れない
          </List.Item>
          <List.Item>
            サービスができてからはユーザーインタビューなどを繰り返し、本当に欲しいものは何かを検証したり、インサイトを獲得する
          </List.Item>
        </List>
      </Paper>

      <Divider my="3rem" />

      <Title order={2} my="2rem">
        4.アプリの完成度が高ければユーザーがつくと思い込む
      </Title>
      <Text my="xl">
        すでに成功している完成度の高いサイトを触っているとUXが良く「UXの良さが売れるアプリだ」というバイアスが生まれて自分だけでやり切れる作業量ではなくなり、開発速度の低下を招きます。
      </Text>
      <Paper shadow="lg" radius="md" p="lg" my="md">
        <Title order={3} my="md">
          解決のヒント💡
        </Title>
        <List
          icon={
            <ThemeIcon color="teal" size={20} radius="xl">
              <IconCircleCheck size="1rem" />
            </ThemeIcon>
          }
          spacing="xs"
          my="lg"
        >
          <List.Item>完成度は「ブランド力」という要素の一部</List.Item>
          <List.Item>
            サービスの価値を高めるための一部でしかないことを理解する
          </List.Item>
          <List.Item>
            何度も修正が入り、アイデアが思い付いた時から大きく違うサービスが変化していくことを心得ておく
          </List.Item>
        </List>
      </Paper>

      <Divider my="3rem" />

      <Title order={2} my="2rem">
        5.アイデアの閃きが全てと思い込む
      </Title>
      <Text my="xl">
        時間をかけてやっと出てきたアイデアだからこそ価値があると思い込みやすいです。
        <br />
        自分の中で「欲しい！」という感情が強くなり過ぎてしまい、周りが見えなくなりユーザの需要からずれてしまう場合が多くあります。
      </Text>
      <Paper shadow="lg" radius="md" p="lg" my="md">
        <Title order={3} my="md">
          解決のヒント💡
        </Title>
        <List
          icon={
            <ThemeIcon color="teal" size={20} radius="xl">
              <IconCircleCheck size="1rem" />
            </ThemeIcon>
          }
          spacing="xs"
          my="lg"
        >
          <List.Item>
            残念ながら、まだ自分の頭の中の妄想である事を理解する
          </List.Item>
          <List.Item>最初に出たアイデアは仮説に過ぎない</List.Item>
          <List.Item>
            検証をする中で、自らの思考の漏れを見つけながら思索を繰り返していく
          </List.Item>
        </List>
      </Paper>

      <Divider my="3rem" />

      <Title order={2} my="2rem">
        6.無自覚にバイアスのかかったユーザーインタビューをする
      </Title>
      <Text my="xl">
        自分がいいと思って入れた仕組みやサービスを人に説明する際、認めて欲しいという思いが強いあまり、無意識に「Yes」を引き出すための説明と質問をしてしまうことがよくあります。
        <br />
        知り合いや面と向かって行うインタビュー、利害関係もない状態で行うインタビューでは多くの場合、よっぽどのことが無い限り相手は「No」と言わない。もしくは言いにくい状態になります。
      </Text>
      <Paper shadow="lg" radius="md" p="lg" my="md">
        <Title order={3} my="xl">
          解決のヒント:1💡
        </Title>
        <List
          icon={
            <ThemeIcon color="teal" size={20} radius="xl">
              <IconCircleCheck size="1rem" />
            </ThemeIcon>
          }
          spacing="xs"
          my="lg"
        >
          <List.Item>
            聞くべき内容をあらかじめ文章化してブラッシュアップしておく
          </List.Item>
          <List.Item>自分よがりの質問になっていないか</List.Item>
          <List.Item>
            オーブンクエッション、もしくは、良いところも改善点も取り込めるようにする
          </List.Item>
          <List.Item>
            「AってBですよね？」という質問はせずに、「Aについて良かった点、改善点を教えてください」といった質問にする
          </List.Item>
        </List>
      </Paper>
      <Paper shadow="lg" radius="md" p="lg" my="md">
        <Title order={3} my="xl">
          解決のヒント:2💡
        </Title>
        <List
          icon={
            <ThemeIcon color="teal" size={20} radius="xl">
              <IconCircleCheck size="1rem" />
            </ThemeIcon>
          }
          spacing="xs"
          my="lg"
        >
          <List.Item>多くの一時情報を手に入れる</List.Item>
          <List.Item>
            例）学校の先生に対してのアプリケーションを作ろうとしていて、エンジニアにインタビューをしても意味がない課題に対してのストーリーを伺う
          </List.Item>
          <List.Item>
            現状はどのような<Mark color="yellow">代替案を活用</Mark>
            しているかを確認する
          </List.Item>
        </List>
      </Paper>

      <Divider my="3rem" />

      <Title order={2} my="2rem">
        7.多くの人に気に入られようとする
      </Title>
      <Text my="xl">
        サービスを作る上で「自分が欲しい！」と思ったアイデアを大衆にフィットさせようとし過ぎてしまうという事がよくあります。
        <br />
        大衆向けにサービスを作るのはそれだけ自分のサービスの対市場規模を大きくしたいという気持ちからついつい色んな機能やアイデアを盛り込みたくなってしまいます。
        <br />
        けれどそう言った大衆の求めるサービス市場はどの会社もたくさんの資金、リソースを投下しているので個人で対抗するのは物理的に難しいです。
        <br />
        企業として動いている訳では無いので、個人リソースの限界を理解しましょう。
      </Text>
      <Paper shadow="lg" radius="md" p="lg" my="md">
        <Title order={3} my="md">
          解決のヒント💡
        </Title>
        <List
          icon={
            <ThemeIcon color="teal" size={20} radius="xl">
              <IconCircleCheck size="1rem" />
            </ThemeIcon>
          }
          spacing="xs"
          my="lg"
        >
          <List.Item>ニッチだけども彼らが欲しいものを目指す</List.Item>
          <List.Item>
            Burning Needs（今すぐにでもお金を払うほど欲しいもの）
          </List.Item>
          <List.Item>ペルソナを細かく設定</List.Item>
          <List.Item>
            ペルソナが設定されることでデザインや機能に一貫性ができる
          </List.Item>
          <List.Item>結果としてUXを高められる</List.Item>
        </List>
      </Paper>

      <Divider my="3rem" />

      <Title order={2} my="2rem">
        8.ペルソナ(自分)に固執しすぎる
      </Title>
      <Text my="xl">
        サービスのペルソナを決める際、多くの人がペルソナを自分に設定してしまう事が多くあります。
        <br />
        これは個人開発者が陥りやすく、簡単に作れるというだけで自分の技術力だけに合わせたり、自分が欲しいものに設定できるが故にありふれたサービス、ユーザーニーズからずれたものになってしまいます。
        <br />
        この場合、自分の感情に固執し過ぎずにユーザーにフォーカスしましょう。
      </Text>
      <Paper shadow="lg" radius="md" p="lg" my="md">
        <Title order={3} my="md">
          解決のヒント💡
        </Title>
        <List
          icon={
            <ThemeIcon color="teal" size={24} radius="xl">
              <IconCircleCheck size="1rem" />
            </ThemeIcon>
          }
          spacing="xs"
          my="lg"
        >
          <List.Item>早い段階でユーザーをつけよう</List.Item>
          <List.Item>
            最初はペルソナが自分でも構わないなるべく早い段階でペルソナ設定をユーザーにずらす必要がある
          </List.Item>
          <List.Item>
            カスタマー視点に立ち、痛みやニーズに関して深い理解があることが前提条件
          </List.Item>
        </List>
      </Paper>

      <Divider my="3rem" />

      <Title order={2} my="2rem">
        9.完成させてからローンチしようとする
      </Title>
      <Text my="xl">
        サービスのローンチを考えた時、人様に見せるものなら未完成のものを出したく無いというプライドが邪魔をして中々サービスが提供できない状態になってしまう事はよくあります。
        <br />
        これは日頃から仕事で質の高い完成品を求められている人にありがちな事ですが個人開発において試作段階でローンチする事はユーザの需要の有無やレスポンスが返ってくるなどが大きなメリットがあります。
      </Text>
      <Paper shadow="lg" radius="md" p="lg" my="md">
        <Title order={3} my="md">
          解決のヒント💡
        </Title>
        <List
          icon={
            <ThemeIcon color="teal" size={24} radius="xl">
              <IconCircleCheck size="1rem" />
            </ThemeIcon>
          }
          spacing="xs"
          my="lg"
        >
          <List.Item>
            サービス開発において、ローンチがゴールではなくユーザーのレスポンスを元にアップデートして行く事が重要なので常に仮説検証をしている事を忘れない
          </List.Item>
          <List.Item>
            まずはMVP（ユーザーが価値に提供できる最小限のプロダクト）を作ってユーザーのレスポンスが返ってくる状況を作り検証を始める
          </List.Item>
          <List.Item>
            まずはMock（実際の機能がない状態）でもローンチして需要があるかを測ってもみるのも良い
          </List.Item>
        </List>
      </Paper>
      <Title order={3} my="xl">
        Mockとは
      </Title>
      <Image
        height="320"
        fit="contain"
        src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F498701%2F3e63095f-ebbd-8b20-4123-4339bbf0a176.jpeg?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=f8076e476459c60af3c866c8df03c441"
        alt="モックのイメージ画像"
      />
      <Text my="xl">
        かつて、IBMが自動タイピング器を開発したとして実験した
        <br />
        マイクに声を入力するだけで画面上に文字がタイプされていくもので、当時は画期的であった
        <br />
        しかし、実際はマイクの先に手動でタイピングをする人がいて、打ち込んだ文字を画面に出力させていただけだった
      </Text>
      <Title order={3} my="xl">
        代替サービスでも良い
      </Title>
      <Text my="xl">
        現在は、ノーコードやGoogleのフォームやスプレッドシートなど寄せ合わせるだけで多くのサービスが簡易的に代替できます。
        <br />
        大事なのは、ユーザーに届けるコアサービスにどれだけの価値があるかを測ることなので、まずは簡易版でアイデアが失敗に終わらないことを確認する事が重要です。
      </Text>

      <Divider my="3rem" />

      <Title order={2} my="2rem">
        10.インタビューをして満足する
      </Title>
      <Text my="xl">
        一定数の人にインタビューをして意見収集ができて、そこで受けた指摘や改善点にも対応をして満足してしまう事が多くあります。
        <br />
        もしくはユーザーの声をそのまま受け止めて、その全てに対応しようと考えてしまい手に負えなくなってしまうという事もあります。
      </Text>
      <Paper shadow="lg" radius="md" p="lg" my="md">
        <Title order={3} my="md">
          解決のヒント💡
        </Title>
        <List
          icon={
            <ThemeIcon color="teal" size={24} radius="xl">
              <IconCircleCheck size="1rem" />
            </ThemeIcon>
          }
          spacing="xs"
          my="lg"
        >
          <List.Item>
            インタビューで重要な点がユーザーの深層心理を言語化してあげること
          </List.Item>
          <List.Item>
            表面的な不満や需要だけではなく、そのストーリーに着目して言語化をする
          </List.Item>
          <List.Item>深層の本音を受け止めた上で仮説を立てる</List.Item>
          <List.Item>
            インタビューは仮説を試す場所でもあるが、仮説検証を立てるタイミングであることも理解する
          </List.Item>
          <List.Item>
            サービスに変更を加えた後にも、インタビューを繰り返し仮説検証をしていく（PDCA）
          </List.Item>
        </List>
      </Paper>

      <Divider my="3rem" />

      <Title order={2} my="2rem">
        11.すぐにマネタイズをしようとする
      </Title>
      <Text my="xl">
        最初のローンチのタイミングでトランザクションが多くなったことに味を占めてマネタイズを急ぐあまりにすぐに広告を付けたり、制限をかけたりすることによってUXが低下してしまう事があります。
        <br />
        そうなるとそこまで関係を築いてきたコアユーザーも離れていくような事態に繋がって行きかねません。
      </Text>
      <Image
        src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F498701%2F5d058bd0-3cd4-094a-b7f3-60ebe5ce1302.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=0dcfa86a0783dbcc4f2abffd1e35e511"
        alt="スクリーンショット 278db9e80c02a55f503 1x"
      />
      <Paper shadow="lg" radius="md" p="lg" my="md">
        <Title order={3} my="md">
          解決のヒント💡
        </Title>
        <List
          icon={
            <ThemeIcon color="teal" size={24} radius="xl">
              <IconCircleCheck size="1rem" />
            </ThemeIcon>
          }
          spacing="xs"
          my="lg"
        >
          <List.Item>中長期的なファイナンス思考が必要</List.Item>
          <List.Item>
            BS思考を中心に目標を作ってサービスの価値を高めていく
          </List.Item>
          <List.Item>
            ⚠️
            利用回数が一回でお金を産むビジネスや、時間単価が見合わなかったり、広告費などの費用を度外視している場合もある
          </List.Item>
        </List>
      </Paper>

      <Divider my="3rem" />

      <Title order={2} my="2rem">
        12.モチベーションがなくなる
      </Title>
      <Text my="xl">
        これはサービス開発をする上で最大の大敵です。
        <br />
        個人開発においては儲かるのも自分一人だけど困るのも自分一人
        <br />
        つまり、全て自分の内面や外部状況次第でモチベーションが変わり、責任感が薄くなり長期間化でモチベーションが薄まってしまう事が多くあります。
      </Text>
      <Paper shadow="lg" radius="md" p="lg" my="md">
        <Title order={3} my="md">
          解決のヒント💡
        </Title>
        <List
          icon={
            <ThemeIcon color="teal" size={20} radius="xl">
              <IconCircleCheck size="1rem" />
            </ThemeIcon>
          }
          spacing="xs"
          my="lg"
        >
          <List.Item>何よりユーザーをつける</List.Item>
          <List.Item>
            まずはデプロイをしたり、知り合いや第三者にレビューしてもらうなど人目につく環境を作ること
          </List.Item>
          <List.Item>
            反響が返ってきたり、使用者の顔が浮かぶようになると自ずとモチベーションが保たれます
          </List.Item>
        </List>
      </Paper>

      <Divider my="3rem" />

      <Title order={2} my="2rem">
        13.面白そうドリブンで進める
      </Title>
      <Text my="xl">
        「誰」の「どんな」課題を「どうやって」解決するかが決まってないままにただ単純に「ワクワクした」という感情的な理由だけで開発を進めてしまう事があります。
        <br />
        それは初期衝動としてはとても良いですが結果として目的やサービスに対する軸がぶれてしまうのでリスクとなってしまう事もあります。
      </Text>
      <Paper shadow="lg" radius="md" p="lg" my="md">
        <Title order={3} my="md">
          解決のヒント💡
        </Title>
        <List
          icon={
            <ThemeIcon color="teal" size={20} radius="xl">
              <IconCircleCheck size="1rem" />
            </ThemeIcon>
          }
          spacing="xs"
          my="lg"
        >
          <List.Item>
            誰がどうやって喜ぶかまでを描けるほど課題からソリューションまでの流れを想定
          </List.Item>
          <List.Item>
            何を解決しているサービスなのかを１文で明文化する（やりたいことが増えすぎて一言で言えないサービスになりがちなので、自分の提供するサービスの核を理解し、ユーザーに伝わるように極力短文で表現しましょう）
          </List.Item>
        </List>
      </Paper>

      <Divider my="3rem" />

      <Title order={2} my="2rem">
        14.すぐに作ろうとしてしまう
      </Title>
      <Text my="xl">
        未完成でローンチする事の大切さも対応方法の一つと前述しました。
        <br />
        それはアイデアが固まってからの話でサービスを開発するには「どのようなサービスを届けたいか」を明確にし、そこにどの程度の工数がかるのかを洗い出す必要があります。
        <br />
        しかし開発工数が大きくかかる場合、最初からWBSを引いて開発を進めるのはリスクで時間がかかり過ぎて頓挫してしまいかねません。
        <br />
        そこで継続的に仮説検証を行い、作り込むべきサービスなのかミニマルバリュープロダクトを作成して需要を確かめるのか状況に合った方法を選定する手順を踏みましょう。
      </Text>
      <Paper shadow="lg" radius="md" p="lg" my="md">
        <Title order={3} my="md">
          例外もある
        </Title>
        <Image
          src="//images.ctfassets.net/21j88hnww0mj/6gpl7vmvXaIZdGpja4aHbd/5420c0deb98aab76b8076126a769ed1f/____________________________2022-10-30_16.03.35.png"
          alt="スクリーンショット 2022-10-30 16.03.35"
          height="320"
          fit="contain"
        />
        <Text my="lg">
          AI画像アプリがAPIを発表し、どのサービスがLINEなどのサービスに組み込むかのイス取り合戦が起きました
        </Text>
      </Paper>

      <Divider my="3rem" />

      <Title order={2} my="2rem">
        15.最初に想定したビジネスモデルに執着する
      </Title>
      <Text my="xl">
        最初に「これだ！」と閃いて周りにも発表して口外したアイデアを変えるのは簡単ではありません。
        <br />
        また、サービスに関わる人が多くなればなるほどビジネスモデルのピボットが難しくなります。
        <br />
        これは過去にビジネスの成功体験がある人によくある事だと思います。
      </Text>
      <Paper shadow="lg" radius="md" p="lg" my="md">
        <Title order={3} my="md">
          解決のヒント💡
        </Title>
        <List
          icon={
            <ThemeIcon color="teal" size={20} radius="xl">
              <IconCircleCheck size="1rem" />
            </ThemeIcon>
          }
          spacing="xs"
          my="lg"
        >
          <List.Item>常に「仮説・検証」という言葉を使う</List.Item>
          <List.Item>
            確認作業をしているという認識を自他ともに持ちサンクコストを下げる
          </List.Item>
        </List>
      </Paper>

      <Divider my="3rem" />

      <Title order={2} my="2rem">
        16.差別化を意識しすぎる
      </Title>
      <Text my="xl">
        ライバルがまだ囲えていない需要を取りに行きたいと思うばかりに既存サービスとの差分を出すことにフォーカスし過ぎてしまいコアサービスの軸がぶれてしまうという事はよくあります。
        <br />
        これはマーケティング経験者に多い印象です。
      </Text>
      <Paper shadow="lg" radius="md" p="lg" my="md">
        <Title order={3} my="md">
          解決のヒント💡
        </Title>
        <List
          icon={
            <ThemeIcon color="teal" size={20} radius="xl">
              <IconCircleCheck size="1rem" />
            </ThemeIcon>
          }
          spacing="xs"
          my="lg"
        >
          <List.Item>カスタマーが求めるものがすべて</List.Item>
          <List.Item>カスタマーの需要をもとに仮説を立てる</List.Item>
          <List.Item>
            カスタマーに結びつかない事を積極的にすべきではない
          </List.Item>
        </List>
      </Paper>

      <Divider my="3rem" />

      <Title order={2} my="2rem">
        17.Nice-to-haveな機能をプロダクトに追加する
      </Title>
      <Text my="xl">
        インタビューで多くの意見を得られた場合カスタマーの意見に翻弄されてしまう事があります。
        <br />
        Nice-to-haveとは「あったほうが良い」の意味で全ての要望を叶えようとするとターゲットやサービスの方向性がぶれてしまいます。これはエンジニア経験者によくある事で以下の解決策をもとに追加すべき機能を選定する事が大切です。
      </Text>
      <Paper shadow="lg" radius="md" p="lg" my="md">
        <Title order={3} my="xl">
          解決のヒント💡
        </Title>
        <List
          icon={
            <ThemeIcon color="teal" size={20} radius="xl">
              <IconCircleCheck size="1rem" />
            </ThemeIcon>
          }
          spacing="xs"
          my="lg"
        >
          <List.Item>
            Burning
            Needs（今すぐにでもお金を払うほど欲しいもの）に当てはめられているかを基準にする
          </List.Item>
          <List.Item>
            チケットとしてもMVPを作成した後に追加チケットではなく改善チケットに取り掛かる
          </List.Item>
        </List>
      </Paper>

      <Divider my="3rem" />

      <Title order={2} my="2rem">
        18.最初からプロダクトデザインやユーザビリティの高さにこだわる
      </Title>
      <Text my="xl">
        世の中の使われるサイトはUXが良いので安易な考えに陥り、UXが良い=売れるサービスと勘違いしてしまう事が多いです。
        <br />
        デザイナーよりの方によくあり、いち早くユーザレスポンスを得るために「UXや新機能は仮説検証して行く上で追加して行く」イメージを持つと良いです。
      </Text>
      <Paper shadow="lg" radius="md" p="lg" my="md">
        <Title order={3} my="md">
          解決のヒント💡
        </Title>
        <List
          icon={
            <ThemeIcon color="teal" size={20} radius="xl">
              <IconCircleCheck size="1rem" />
            </ThemeIcon>
          }
          spacing="xs"
          my="lg"
        >
          <List.Item>
            いくら使いやすものを作ってもユーザーに刺さり、価値を産んでいなければ意味がない
          </List.Item>
          <List.Item>UXを高める ＜ 素早い検証</List.Item>
          <List.Item>優先順位を仕組みで分ける</List.Item>
          <List.Item>
            サービスの根幹となるチケットとUX改善チケットは別で管理する
          </List.Item>
        </List>
      </Paper>

      <Divider my="3rem" />

      <Title order={2} my="2rem">
        19. 最初からシステムの自動化・最適化を行う
      </Title>
      <Text my="xl">
        これはバックエンドエンジニアにありがちな事ですがサービス開発をしている時、エンジニアであれば難しいシステムでも自動化を急ぎたくなる事がよくあります。
        <br />
        しかし、サービスに需要があると予測がついてからにしないと開発の期間が伸びるとユーザーに届くまでの時間が延びるので危険です。
      </Text>
      <Paper shadow="lg" radius="md" p="lg" my="md">
        <Title order={3} my="md">
          解決のヒント💡
        </Title>
        <List
          icon={
            <ThemeIcon color="teal" size={20} radius="xl">
              <IconCircleCheck size="1rem" />
            </ThemeIcon>
          }
          spacing="xs"
          my="lg"
        >
          <List.Item>MVPはアナログや手作業でOK</List.Item>
          <List.Item>機能やコンセプトに需要があるかを確かめる</List.Item>
          <List.Item>
            むしろ、その自動化にかけた時間が無駄になる可能性を加味してタイムマネジメントを行うべし
          </List.Item>
        </List>
      </Paper>

      <Divider my="3rem" />

      <Title order={2} my="2rem">
        20. 稼働を少なくして個人開発を行う
      </Title>
      <Text my="xl">
        売上も減り、心に余裕が持てなくなり、毎日のタスクが自分のモチベーションに左右される事があります。
        <br />
        時間がありすぎて、非効率になりがち（経験済み）
        <br />
        自分で全てやろうとしてしまって詰まってしまう
      </Text>

      <Paper shadow="lg" radius="md" p="lg" my="md">
        <Title order={3} my="md">
          解決のヒント💡
        </Title>
        <List
          icon={
            <ThemeIcon color="teal" size={20} radius="xl">
              <IconCircleCheck size="1rem" />
            </ThemeIcon>
          }
          spacing="xs"
          my="lg"
        >
          <List.Item>コミュニティの力を使いましょう</List.Item>
          <List.Item>
            運営者ギルドなど個人開発者コミュニティに入ると質問できたり高いモチベーションを持った人と交流する
          </List.Item>
          <List.Item>
            （インタビューをさせて頂き）チーム開発や個人開発者コミュニティに入ることで自分に足りない差分を埋めることができる
          </List.Item>
        </List>
      </Paper>

      <Paper
        style={{ backgroundColor: '#FAFAFA' }}
        my="3rem"
        p="lg"
        shadow="xl"
      >
        <Title my="md" fz="1.8rem" fw="bold">
          まとめ
        </Title>
        <Text my="xl">
          サービス開発を成功させるには意外と難易度が高いです。
          <br />
          <br />
          しかし、上記に記載したように大きなを失敗を避けて確実に成功に近づける方法はあるので上記の解決策を状況に合わせて実践し、試行錯誤しながら検証を繰り返していくことがサービス開発成功させる上で大切です。
          <br />
          試行錯誤を繰り返して成果につなげようとする努力がエンジニアの醍醐味でもあり、その努力が世界を良くしていくのかもしれません。
          <br />
          <br />
          <Mark color="yellow">成功は芸術。失敗は科学。</Mark>
        </Text>
      </Paper>

      <Text my="4rem">
        以上、個人開発における陥りがちな20個の落とし穴をご紹介しました。
        開発者の数だけ意見があると思うのでより良いページへブラッシュアップして行くためにもご意見ご要望等ありましたら
        <Anchor
          href="https://naruhiro-portfolio.firebaseapp.com/"
          target="_blank"
        >
          管理者
        </Anchor>
        までお聞かせ下さい。 それではみなさん、良き開発ライフを！！
      </Text>
    </>
  )
}
