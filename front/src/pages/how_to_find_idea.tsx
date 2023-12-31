import { Button, Center, Container, Grid, Text, Title } from '@mantine/core'
import { ColorsComponent } from '@/components/footDesignComponent/colorsComponent'

const HowToFindIdeaPage = () => {
  return (
    <Container my="6rem">
      <Title order={1} mb="xl">
        アイディアの見つけ方💡
      </Title>

      <Title order={4}>この記事のターゲット</Title>

      <Text mb="lg" bg={'#fdf8eb'} p="xs">
        ・アプリのアイデアが思いつかない人
        <br />
        ・以前作ったアプリに物足りなさを感じている人
        <br />
        ・他の人がどうやってアイデアを出しているか気になる人
      </Text>

      <Grid my="4rem">
        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          <Title order={2} mb="xl">
            アイディアは掛け合わせ!
          </Title>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          <Title order={4}>インプットが大切</Title>
          <Text mb="lg">
            ideeeは、もったいないを無くし「誰かの役に立つもの」を増やすために作られています。
            <br />
            アイデアが思いつく人、アイデアを形にできる人。それぞれが才能です。「作ったけど需要がなくて使われない」「アイデアは面白いけどリソースがなくて作れない」才能たちをマッチさせることによって、そんな機会損失を少しでも無くしていけると考えています。
            <br />
            改善を見つける才能・開発の才能をぜひ活かしましょう
          </Text>

          <Title order={4}>使えるAPIから考える</Title>
          <Text>
            ideeeは、もったいないを無くし「誰かの役に立つもの」を増やすために作られています。
            <br />
            アイデアが思いつく人、アイデアを形にできる人。それぞれが才能です。「作ったけど需要がなくて使われない」「アイデアは面白いけどリソースがなくて作れない」才能たちをマッチさせることによって、そんな機会損失を少しでも無くしていけると考えています。
            <br />
            改善を見つける才能・開発の才能をぜひ活かしましょう
          </Text>
        </Grid.Col>
      </Grid>

      <Grid my="4rem">
        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          <Title order={2} mb="xl">
            ひねり出す方法
          </Title>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          <Title order={4}>インプットが大切</Title>
          <Text mb="lg">
            ideeeは、もったいないを無くし「誰かの役に立つもの」を増やすために作られています。
            <br />
            アイデアが思いつく人、アイデアを形にできる人。それぞれが才能です。「作ったけど需要がなくて使われない」「アイデアは面白いけどリソースがなくて作れない」才能たちをマッチさせることによって、そんな機会損失を少しでも無くしていけると考えています。
            <br />
            改善を見つける才能・開発の才能をぜひ活かしましょう
          </Text>

          <Title order={4}>使えるAPIから考える</Title>
          <Text>
            ideeeは、もったいないを無くし「誰かの役に立つもの」を増やすために作られています。
            <br />
            アイデアが思いつく人、アイデアを形にできる人。それぞれが才能です。「作ったけど需要がなくて使われない」「アイデアは面白いけどリソースがなくて作れない」才能たちをマッチさせることによって、そんな機会損失を少しでも無くしていけると考えています。
            <br />
            改善を見つける才能・開発の才能をぜひ活かしましょう
          </Text>
        </Grid.Col>
      </Grid>

      <Title order={4}>まとめ</Title>

      <Text mb="lg" bg={'#fdf8eb'} p="xs">
        アイデア出し = スキル ≠ 才能
        <br />
        日頃から視野を広げてアイデア探しをすれば、既存のモノから簡単に新しいアイデアを生み出せる！
      </Text>

      <Center>
        <Button bg={'#ff862e'}>最新のアイディアを見る</Button>
      </Center>
    </Container>
  )
}
export default HowToFindIdeaPage