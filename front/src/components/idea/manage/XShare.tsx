import { IconBrandX } from '@tabler/icons-react'
import { Anchor } from '@mantine/core'
import { useRouter } from 'next/router'
import type { Idea } from '@/lib/generated/client'

type XShareProps = {
  idea?: Idea
}

export const XShare = ({ idea }: XShareProps) => {
  const router = useRouter()
  const currentUrl = process.env.NEXT_PUBLIC_FRONT_URL + router.asPath
  const hashtags = idea?.ideaTags?.map((tag) => tag.name).join(',') || ''
  const viaUser = !!idea?.user?.twitterId ? `&via=${idea?.user?.twitterId}` : ''
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${idea?.name}&hashtags=ideee,${hashtags}${viaUser}&related=ideee_tech&url=${currentUrl}`
  return (
    <Anchor color="black" target="_blank" pt="0.4rem" href={twitterShareUrl}>
      <IconBrandX />
    </Anchor>
  )
}
