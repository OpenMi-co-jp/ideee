import { Box, rem, Text } from '@mantine/core'
import Link from 'next/link'
import dayjs from '@/lib/format/dayjs'

export const CampaignBox = ({ pinned }: { pinned: boolean }) => {
  const now = dayjs()

  // キャンペーン期間を設定
  const targetDate = dayjs('2024-10-01')
  const isOnCampaignDate = now >= targetDate && now <= targetDate.endOf('month')

  if (!isOnCampaignDate) return null

  return (
    <Box
      style={{
        position: 'fixed',
        top: '64px',
        left: 0,
        right: 0,
        minHeight: '32px',
        backgroundColor: 'purple',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: `translate3d(0, ${pinned ? 0 : rem(-110)}, 0)`,
        transition: 'transform 400ms ease',
        backgroundImage: 'linear-gradient(to right, purple, red, orange)',
      }}
    >
      <Link
        href="/campaign/sentry"
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text c={'white'} fw={700}>
          🎊 10月末までSentry Japanとのコラボキャンペーン中 🎉
          Amazonチケットが当たるキャンペーン 🚀
        </Text>
      </Link>
    </Box>
  )
}
