import { SegmentedControl, Flex } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const SortSegments = () => {
  const router = useRouter()
  const { column_name, ...otherParams } = router.query
  const [selectedSort, setSelectedSort] = useState<string>('')

  useEffect(() => {
    setSelectedSort(column_name ? String(column_name) : 'likes_num')
  }, [column_name])

  const handleSortChange = (value: string) => {
    if (value !== selectedSort) {
      setSelectedSort(value)
      router.replace({
        pathname: '/search',
        query: { ...otherParams, column_name: value, order: 'desc' },
      })
    }
  }

  return (
    <Flex mt={'lg'} justify="flex-end" align="center" wrap="wrap">
      <SegmentedControl
        value={selectedSort}
        onChange={handleSortChange}
        radius="xl"
        color="yellow"
        data={[
          { value: 'likes_num', label: 'いいね数' },
          { value: 'comments_num', label: 'コメント数' },
          { value: 'published_at', label: '公開時間' },
        ]}
      />
    </Flex>
  )
}
