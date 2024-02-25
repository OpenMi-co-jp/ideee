import { FC } from 'react'
import { UserIcon } from '@/components/user'

type ImageComponentProps = {
  src: string
}

export const UserImage: FC<ImageComponentProps> = ({ src }) => {
  return <UserIcon userIcon={src} height={150} />
}
