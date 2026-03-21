import { PopularTags } from '@/components/tag'
import {
  SearchedIdeas,
  SearchInput,
  StanceCheck,
  DifficultyCheck,
  SortSegments,
} from '@/components/idea'
import { useRouter } from 'next/router'
import { HeadBlock } from '@/pages-layout/Head'

export default function Search() {
  const router = useRouter()
  const { query } = router
  const queryExist = Object.keys(query).length

  return (
    <>
      <HeadBlock
        pageTitle="アイデア検索"
        pageDescription="ideeeでアイデアを検索。タグや難易度、スタンスで絞り込んでぴったりのアイデアを見つけよう。"
        pagePath="https://ideee.tech/search"
        pageKeywords="アイデア,検索,探す,タグ,難易度,スタンス"
      />
      <SearchInput />
      <StanceCheck />
      <DifficultyCheck />
      <SortSegments />
      {queryExist ? <SearchedIdeas /> : <PopularTags />}
    </>
  )
}
