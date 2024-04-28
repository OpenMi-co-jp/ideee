import {
  Paper,
  Text,
  Divider,
  Flex,
  Title,
  Center,
  Pagination,
} from '@mantine/core'
import { useGetIdeasQuery } from '@/lib/generated/client'
import { IdeaList } from '@/components/idea'
import { AlertError } from '@/components/alert'
import { IconSearch } from '@tabler/icons-react'
import { IdeaNotFound } from '@/components/idea'
import { useRouter } from 'next/router'
import { LoaderBox } from '@/components/features'
import { useState } from 'react'

const PAGE_SIZE = 16

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

  const { loading, data, error, refetch } = useGetIdeasQuery({
    variables: { searchCondition: searchQuery, page: 1, per: PAGE_SIZE },
  })
  const [page, setPage] = useState(1)

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    refetch({ page: newPage, per: PAGE_SIZE })
  }

  if (loading) return <LoaderBox />
  if (error) return <AlertError />

  const { totalPages, totalCount } = data?.ideas.pageInfo || {}

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
      {totalCount === 0 ? (
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
          <Center my="xl">
            {totalPages && totalPages > 1 && (
              <Pagination total={totalPages} onChange={handlePageChange} />
            )}
          </Center>
        </>
      )}
    </>
  )
}
