import { PopularTags } from '@/components/tag'
import {
  SearchedIdeas,
  SearchInput,
  StanceCheck,
  DifficultyCheck,
  SortSegments,
} from '@/components/idea'
import { useRouter } from 'next/router'

export default function Search() {
  const router = useRouter()
  const { query } = router
  const queryExist = Object.keys(query).length

  return (
    <>
      <SearchInput />
      <StanceCheck />
      <DifficultyCheck />
      <SortSegments />
      {queryExist ? <SearchedIdeas /> : <PopularTags />}
    </>
  )
}
