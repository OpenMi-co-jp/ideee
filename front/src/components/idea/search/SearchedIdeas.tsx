import { Paper, Text, Divider, Flex, Title } from '@mantine/core'
import { useGetIdeasQuery } from '@/lib/generated/client'
import { IdeaList } from '@/components/idea'
import { AlertError } from '@/components/alert'
import { IconSearch } from '@tabler/icons-react'
import { IdeaNotFound } from '@/components/idea'
import { useRouter } from 'next/router'
import { LoaderBox } from '@/components/features'

export const SearchedIdeas = () => {
  const router = useRouter()
  const { query } = router
  const searchQuery = {
    nameOrIdeaTagsNameCont:
      (query.name_or_idea_tags_name_cont as string) || null,
    difficultyEq: Number(query.difficulty_eq) || null,
    teamStatusEq: Number(query.team_status_eq) || null,
    publishedAtGteq: (query.published_at_gteq as string) || null,
    publishedAtLteq: (query.published_at_lteq as string) || null,
  }
  const { loading, data, error } = useGetIdeasQuery({
    variables: { searchCondition: searchQuery },
  })
  if (loading) return <LoaderBox />
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
            <Text ml="xs" c="gray">
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
            <Title order={4} m="sm" c="gray">
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
