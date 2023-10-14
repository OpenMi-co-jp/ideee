import { PopularTags } from '@/components/tag'
import { SearchedIdeas, SearchInput } from '@/components/idea'
import { useRouter } from 'next/router'

export default function Search() {
  const router = useRouter()
  const { query } = router
  const queryExist = Object.keys(query).length

  return (
    <>
      <SearchInput />
      {queryExist ? <SearchedIdeas /> : <PopularTags />}
    </>
  )
}
