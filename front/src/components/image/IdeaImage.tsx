import { Image, Modal, Group } from '@mantine/core'
import { FC, useState } from 'react'

type ImageComponentProps = {
  src: string
}

export const IdeaImage: FC<ImageComponentProps> = ({ src }) => {
  const [opened, setOpened] = useState(false)

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} centered>
        <Image src={src} alt="アイデアイメージ" />
      </Modal>

      <Group align="center">
        <Image
          src={src}
          alt="アイデアイメージ"
          radius="sm"
          fit="contain"
          height={200}
          onClick={() => setOpened(true)}
          style={{ cursor: 'pointer' }}
        />
      </Group>
    </>
  )
}
