import { Title, Text, Center, Box, Grid } from '@mantine/core'

export const Description = () => {
  return (
    <>
      <Grid my="4rem">
        <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
          <Title order={2} mb="xl">
            全ての才能が有効活用され、世の中のもったいないを無くす
          </Title>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 8, lg: 8 }}>
          <Text>
            ideeeは、もったいないを無くし「誰かの役に立つもの」を増やすために作られています。
            <br />
            アイデアが思いつく人、アイデアを形にできる人。それぞれが才能です。「作ったけど需要がなくて使われない」「アイデアは面白いけどリソースがなくて作れない」才能たちをマッチさせることによって、そんな機会損失を少しでも無くしていけると考えています。
            <br />
            改善を見つける才能・開発の才能をぜひ活かしましょう
          </Text>
        </Grid.Col>
      </Grid>

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
    </>
  )
}
