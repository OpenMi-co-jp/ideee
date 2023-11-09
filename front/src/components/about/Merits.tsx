import { Title, Center, Grid } from '@mantine/core'
import { Merit } from './Merit'

export const Merits = () => {
  const meritsData = [
    {
      image: {
        path: '/img/about_search.webp',
        alt: 'アイデアを探す人',
      },
      message: {
        title: 'アイデアが見つかる',
        description:
          '権利フリーのアイデアもたくさん見つかります。\n\nあなたのコードで世の中をちょっとよくしませんか？',
      },
    },
    {
      image: {
        path: '/img/about_overview.webp',
        alt: 'データを確認する人',
      },
      message: {
        title: '需要を確認できる',
        description:
          '作ってから誰にも使われないのはとてももったいない。\n\nアイデアを公表し、反応を確認することでブラッシュアップされます。',
      },
    },
    {
      image: {
        path: '/img/about_connect.webp',
        alt: '仲間を見つける',
      },
      message: {
        title: '仲間が見つかる',
        description:
          'チーム開発の募集ができます。\n\n実現したい世界観を描いて、チームを作れるユニークなギルドとして活用できます',
      },
    },
  ]

  return (
    <>
      <Center my="3rem">
        <Title order={2}>メリット</Title>
      </Center>

      <Grid gutter="xl">
        {meritsData.map((data, index) => (
          <Grid.Col span={{ base: 12, lg: 4 }} key={data.message.title}>
            <Merit data={data} />
          </Grid.Col>
        ))}
      </Grid>
    </>
  )
}
