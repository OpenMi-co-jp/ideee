import { Title, Paper, Flex } from '@mantine/core'
import { useGetSuggestIdeasQuery } from '@/lib/generated/client'
import { IdeaList } from '@/components/idea'
import { IconBrowser } from '@tabler/icons-react'
import { AlertError } from '@/components/alert'
import { LoaderBox } from '@/components/features'
import { useRouter } from 'next/router'

export const SuggestIdeas = () => {
  const { id } = useRouter().query
  const { loading, data, error } = useGetSuggestIdeasQuery({
    variables: {
      ideaId: id as string,
    },
  })
  if (loading) return <LoaderBox />
  if (error) return <AlertError />

  return (
    <Paper
      shadow="xs"
      radius="lg"
      py="xl"
      my="xl"
      style={{ border: 'thick double #FFECCC' }}
    >
      <Flex justify="left" align="center" direction="row" wrap="nowrap" mx="xl">
        <Paper shadow="sm" radius="md" p="xs">
          <IconBrowser size={30} stroke={1.5} />
        </Paper>
        <Title order={3} mx="xl" my="sm" c="#E5AA37">
          {data?.suggestIdeas.title}
        </Title>
      </Flex>
      <IdeaList ideas={data?.suggestIdeas.nodes} />
    </Paper>
  )
}
