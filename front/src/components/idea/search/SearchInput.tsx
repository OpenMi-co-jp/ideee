import { Autocomplete, Button } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { useGetTagsQuery } from '@/lib/generated/client'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export const SearchInput = () => {
  const { loading, data } = useGetTagsQuery()
  const [searchTrigger, setSearchTrigger] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const tags: string[] =
    loading || !data?.tags ? [] : data.tags.map((tag) => tag.name)

  const router = useRouter()
  const { query } = router

  useEffect(() => {
    if (loading) {
      setSearchValue(query.name_or_idea_tags_name_cont as string)
    }
  }, [query, loading])

  return (
    <Autocomplete
      data={tags}
      size="md"
      placeholder="アイデアを検索"
      limit={10}
      leftSection={<IconSearch size={18} />}
      styles={{
        input: {
          border: 0,
          backgroundColor: 'transparent',
          borderBottom: 'solid gray',
        },
        dropdown: {
          transition: 'pop-top-left',
          transitionDuration: '300',
          transitionTimingFunction: 'ease',
        },
// TODO: ドロップダウンの時のアニメーションがおかしい。
      }}
      value={searchValue}
      onSubmit={( value ) => {
        router.push(`/search?name_or_idea_tags_name_cont=${value}`)
        setSearchTrigger(false)
      }}
      onChange={(value) => {
        setSearchValue(value)
      }}
      onDropdownOpen={() => {
        setSearchTrigger(true)
      }}
      rightSection={
        searchTrigger ? (
          <Link href={`/search?name_or_idea_tags_name_cont=${searchValue}`}>
            <Button color="yellow" radius="xl" size="compact-sm"
            >
              クリックで検索
            </Button>
          </Link>
        ) : null
      }
      rightSectionWidth={100}
    />
  )
}
