import { Title, Text, Mark, List, ThemeIcon, Divider } from '@mantine/core'
import { IconCircleCheck } from '@tabler/icons-react'

export const PreviewContent = () => {
  return (
    <>
      <Title my="4rem" order={1} fw={600} ta="center">
        個人開発のよくある落とし穴まとめ
      </Title>

      <Title order={2} fw={540} my="xl">
        はじめに
      </Title>
      <Text my="xl">
        個人開発において「これをやれば必ず成功する」という方法はありません。しかし、大きな失敗を避けるための体系だったフレームワークや正攻法は存在します。
        <br />
        ここでは管理人の体験をベースとした
        <Mark color="yellow">個人開発における落とし穴を20個厳選して</Mark>
        ご紹介。
        <br />
        よくある落とし穴を先に学んで最短距離であなたが思い描くエンジニア像を目指しましょう！！
      </Text>

      <Title order={2} fw={600}>
        ターゲット
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
        <List.Item>個人開発を今から始める方</List.Item>
        <List.Item>個人開発で成功体験がまだない方</List.Item>
        <List.Item>失敗を恐れているあなた</List.Item>
      </List>

      <Title order={3} fw={600} my="xl">
        記事を書いた背景
      </Title>

      <Text>
        企業や新規事業開発の落とし穴と個人開発の落とし穴を比較すると共通点が多いです。
        <br />
        これから個人でサービスを作りたいと考えている人やレベルアップのために個人開発をやっていきたい人へのヒントになると思い、スタートアップの記事や個人開発者へのインタビューを通して気付いた落とし穴を厳選してまとめました💡
      </Text>

      <Divider my="3rem" />

      <Title order={1} my="4rem" ta="center">
        よくある落とし穴
        <br />
        🕳
      </Title>
    </>
  )
}
