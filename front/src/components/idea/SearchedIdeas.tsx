import { Loader, Paper, Text, Divider, Flex, Title } from '@mantine/core'
import { useGetIdeasQuery } from '@/lib/generated/client'
import { IdeaList } from '@/components/idea'
import { AlertError } from '@/components/alert'
import { IconSearch } from '@tabler/icons-react'
import { IdeaNotFound } from '@/components/idea'

type SearchProps = {
  query: {
    nameOrIdeaTagsNameCont: string | null
    difficultyEq: number | null
    teamStatusEq: number | null
    publishedAtGteq: string | null
    publishedAtLteq: string | null
  }
}

export const SearchedIdeas: React.FC<SearchProps> = ({ query }) => {
  const { loading, data, error } = useGetIdeasQuery({
    variables: { searchCondition: query },
  })
  if (loading) return <Loader color="yellow" />
  if (error) return <AlertError />
  const totalCount = data?.ideas.pageInfo?.totalCount

  return (
    <>
      <Divider
        my="xl"
        variant="dashed"
        labelPosition="center"
        label={
          <>
            <IconSearch size={12} />
            <Text ml="xs" color="gray">
              Search results
            </Text>
          </>
        }
      />
      {totalCount == 0 ? (
        <IdeaNotFound />
      ) : (
        <>
          <Flex justify="left" align="center" direction="row" wrap="nowrap">
            <IconSearch stroke={1.2} />
            <Title order={4} m="sm" color="gray">
              検索結果: {totalCount} 件
            </Title>
          </Flex>
          <Paper shadow="md" py="lg" my="xl">
            <IdeaList ideas={data?.ideas.nodes} />
          </Paper>
        </>
      )}
    </>
  )
}
