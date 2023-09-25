import { useRouter } from 'next/router'

const IdeaDetail = () => {
  const router = useRouter()
  const { id, lang } = router.query

  return (
    <p>
      このページのIDは{id}で言語は{lang}です
    </p>
  )
}

export default IdeaDetail
