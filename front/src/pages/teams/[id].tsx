import TeamDetailContent from '@/components/team/TeamDetailContent'
import { HeadBlock } from '@/pages-layout/Head'
import { useGetTeam } from '@/utils/hooks/useGetTeam'
import { useRouter } from 'next/router'
import { truncateText } from '@/utils/truncateText'

export default function TeamDetail() {
  const { data } = useGetTeam()
  const router = useRouter()
  const team = data?.team

  return (
    <>
      <HeadBlock
        pageTitle={team?.idea?.name ? `${team.idea.name} - チーム開発` : 'チーム開発'}
        pageDescription={truncateText(team?.offer || 'ideeeでチーム開発に参加しよう')}
        pagePath={process.env.NEXT_PUBLIC_FRONT_URL + router.asPath}
        pageKeywords="ideee,チーム開発,エンジニア,コラボレーション"
      />
      <TeamDetailContent />
    </>
  )
}
