import { IconCopy, IconSquareRoundedCheckFilled } from '@tabler/icons-react'
import { CopyButton, Button } from '@mantine/core'
import { useRouter } from 'next/router'
import { showSuccess } from '@/components/notifications'

export const UrlCopy = () => {
  const router = useRouter()
  const currentUrl = process.env.NEXT_PUBLIC_FRONT_URL + router.asPath

  return (
    <CopyButton value={currentUrl} timeout={2000}>
      {({ copied, copy }) => (
        <Button
          color={copied ? 'teal' : 'gray'}
          onClick={() => {
            copy()
            showSuccess({ action: 'URLコピー' })
          }}
          variant="outline"
          size="compact-sm"
        >
          {copied ? <IconSquareRoundedCheckFilled /> : <IconCopy />}
        </Button>
      )}
    </CopyButton>
  )
}
