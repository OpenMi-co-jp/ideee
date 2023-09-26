import { Autocomplete, Container } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { PopularTags } from '@/components/tag'
import { SearchedIdeas } from '@/components/idea'
import { useRouter } from 'next/router'

export default function Search() {
  const router = useRouter()
  const { query } = router
  const queryExist = Object.keys(query).length
  const searchQuery = {
    nameOrIdeaTagsNameCont:
      (query.name_or_idea_tags_name_cont as string) || null,
    difficultyEq: Number(query.difficulty_eq) || null,
    teamStatusEq: Number(query.team_status_eq) || null,
    publishedAtGteq: (query.published_at_gteq as string) || null,
    publishedAtLteq: (query.published_at_lteq as string) || null,
  }

  return (
    <Container>
      <Autocomplete
        data={[]}
        size="md"
        placeholder="アイデアを検索"
        icon={<IconSearch size={18} />}
        styles={{
          root: { flexGrow: 2 },
          input: {
            border: 0,
            backgroundColor: 'transparent',
            borderBottom: 'solid gray',
          },
        }}
        onChange={(value) => {
          // eslint-disable-next-line no-console
          console.log(value)
        }}
      />
      {queryExist ? <SearchedIdeas query={searchQuery} /> : <PopularTags />}
    </Container>
  )
}
