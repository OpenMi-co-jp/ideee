import { Center, Pagination, Text } from '@mantine/core'
import { useGetDraftIdeasQuery } from '@/lib/generated/client'
import { IdeaList } from '@/components/idea'
import { AlertError } from '@/components/alert'
import { LoaderBox } from '@/components/features'
import { useState } from 'react'

export const DraftIdeas = () => {
  const { loading, data, error, refetch } = useGetDraftIdeasQuery()
  const { pageInfo, nodes } = data?.draftIdeas || {}

  const [page, setPage] = useState(1)
  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    refetch({ page: newPage, per: 15 })
  }

  if (loading) return <LoaderBox />
  if (error) return <AlertError />

  return (
    <>
      {pageInfo?.totalCount && pageInfo?.totalCount > 0 ? (
        <>
          {/* TODO 下書きはuserのアイコン表示が必要ないのでリファクタ予定 */}
          <IdeaList ideas={nodes} />
          <Center my="xl">
            {pageInfo?.totalPages && pageInfo?.totalPages > 1 && (
              <Pagination
                total={pageInfo?.totalPages}
                onChange={handlePageChange}
              />
            )}
          </Center>
        </>
      ) : (
        <Center my="xl">
          <Text size="lg">下書きがありません</Text>
        </Center>
      )}
    </>
  )
}
