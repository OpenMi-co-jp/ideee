import { Title, Paper, Flex, Button } from '@mantine/core'
import { useGetHotIdeasQuery } from '@/lib/generated/client'
import { IdeaList } from '@/components/idea'
import { IconConfetti } from '@tabler/icons-react'
import { AlertError } from '@/components/alert'
import { LoaderBox } from '@/components/features'
import { IconChevronRight } from '@tabler/icons-react'
import Link from 'next/link'

export const HotIdeas = () => {
  const { loading, data, error } = useGetHotIdeasQuery()
  if (loading) return <LoaderBox />
  if (error) return <AlertError />

  return (
    <Paper
      shadow="xs"
      radius="lg"
      pt="lg"
      my="lg"
      style={{ border: 'thick double #FFD6AF' }}
    >
      <Flex justify="space-between" align="center">
        <Flex
          justify="left"
          align="center"
          direction="row"
          wrap="nowrap"
          mx="xl"
        >
          <Paper shadow="sm" radius="md" p="sm">
            <IconConfetti size={30} stroke={1.5} />
          </Paper>
          <Title order={2} mx="md" my="md" c="orange">
            ホットなアイデア
          </Title>
        </Flex>
        <Link href={'/search?column_name=published_at&order=desc'} passHref>
          <Button
            variant="subtle"
            c="gray"
            mr="lg"
            rightSection={<IconChevronRight />}
          >
            もっと見る
          </Button>
        </Link>
      </Flex>
      <IdeaList ideas={data?.hotIdeas} />
    </Paper>
  )
}
