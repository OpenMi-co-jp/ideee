import { Avatar, Image } from '@mantine/core'

type UserIconProps = {
  userIcon?: string | null
  height?: number
}

export const UserIcon = ({ height = 30, userIcon = '' }: UserIconProps) => {
  if (!userIcon) {
    return <Avatar radius="xl" />
  }

  return (
    <Image
      style={{ flex: 'none' }}
      height={height}
      width={height}
      mah={height}
      maw={height}
      radius="50%"
      src={userIcon}
      alt="ユーザーアイコン"
    />
  )
}
