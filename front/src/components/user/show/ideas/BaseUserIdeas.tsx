import { Center, Flex, Pagination, Text } from '@mantine/core'
import { IdeaList } from '@/components/idea'
import { IdeaCreateButton } from '@/components/idea/createButton'
import { AlertError } from '@/components/alert'
import { LoaderBox } from '@/components/features'
import { useState } from 'react'
import { IdeasType } from '@/types/idea'
import type { ApolloError } from '@apollo/client'

interface BaseUserIdeasProps {
  loading: boolean
  ideas: Pick<IdeasType, 'nodes' | 'pageInfo'> | null
  error: ApolloError | undefined
  refetch: (variables?: { page: number; per: number }) => void
  emptyMessage: string
  pageSize: number
}

export const BaseUserIdeas = ({
  loading,
  ideas,
  error,
  refetch,
  emptyMessage,
  pageSize,
}: BaseUserIdeasProps) => {
  const { pageInfo, nodes } = ideas || { pageInfo: null, nodes: [] }
  const [page, setPage] = useState(1)

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    refetch({ page: newPage, per: pageSize })
  }

  if (loading) return <LoaderBox />
  if (error) return <AlertError />

  return (
    <>
      {pageInfo?.totalCount && pageInfo?.totalCount > 0 ? (
        <>
          <IdeaList ideas={nodes} />
          <Center my="xl">
            {pageInfo?.totalPages && pageInfo?.totalPages > 1 && (
              <Pagination
                total={pageInfo?.totalPages}
                value={page}
                onChange={handlePageChange}
              />
            )}
          </Center>
        </>
      ) : (
        <Flex my="xl" wrap="wrap" align="center" justify="center" gap="sm">
          <Text size="lg">{emptyMessage}</Text>
          <IdeaCreateButton />
        </Flex>
      )}
    </>
  )
}
