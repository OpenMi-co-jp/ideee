import { Center, Flex, Pagination, Text } from '@mantine/core'
import { useGetPublishedIdeasQuery } from '@/lib/generated/client'
import { IdeaCard } from '@/components/idea'
import { IdeaCreateButton } from '@/components/idea/createButton'
import { AlertError } from '@/components/alert'
import { LoaderBox } from '@/components/features'
import { useState } from 'react'

interface PublishedIdeasProps {
  userId: string
}

const PAGE_SIZE = 10

export const PublishedIdeas = ({ userId }: PublishedIdeasProps) => {
  const { loading, data, error, refetch } = useGetPublishedIdeasQuery({
    variables: {
      userId: userId,
      per: PAGE_SIZE,
    },
  })

  const { pageInfo, nodes } = data?.publishedIdeas || {}
  const [page, setPage] = useState(1)

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    refetch({ page: newPage, per: PAGE_SIZE })
  }

  if (loading) return <LoaderBox />
  if (error) return <AlertError />

  return (
    <>
      {pageInfo?.totalCount && pageInfo?.totalCount > 0 ? (
        <>
          <IdeaCard ideas={nodes} />
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
          <Text size="lg">公開中のアイディアがありません</Text>
          <IdeaCreateButton />
        </Flex>
      )}
    </>
  )
}
