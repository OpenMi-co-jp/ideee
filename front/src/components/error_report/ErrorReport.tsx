import { useState } from 'react'
import { Button, Modal, Affix } from '@mantine/core'
import { IconMessageForward } from '@tabler/icons-react'
import { useBreakPoint } from '@/utils/hooks/useBreakPoint'

export const ErrorReport = () => {
  const { isMobile } = useBreakPoint()
  const [opened, setOpened] = useState(false)

  const handleOpen = () => setOpened(true)
  const handleClose = () => setOpened(false)
  if (isMobile) return null

  return (
    <>
      <Affix position={{ bottom: 32, right: 32 }}>
        <Button
          variant="outline"
          color="gray"
          onClick={handleOpen}
          leftSection={<IconMessageForward />}
        >
          エラー報告
        </Button>
        <Modal opened={opened} onClose={handleClose} size="lg">
          <iframe
            loading="lazy"
            src="https://docs.google.com/forms/d/e/1FAIpQLSetH18i6ElIfhbyV1ExEfYwXP852sSHfph_Qmr1UFg_Z1SqvQ/viewform?embedded=true"
            width="100%"
            height="600"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
          >
            読み込んでいます…
          </iframe>
        </Modal>
      </Affix>
    </>
  )
}
