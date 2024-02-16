import { Image } from '@mantine/core'
import { FC } from 'react'

type ImageComponentProps = {
  src: string
}

export const IdeaImage: FC<ImageComponentProps> = ({ src }) => {
  return (
    <Image
      src={src}
      alt="アイデアイメージ"
      radius="sm"
      fit="contain"
      height={200}
      mah={200}
    />
  )
}
