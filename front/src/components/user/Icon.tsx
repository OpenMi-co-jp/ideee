import { Avatar, Image } from '@mantine/core'

type UserIconProps = {
  userIcon?: string | null
  height?: number
}

export const UserIcon = ({ height = 30, userIcon = '' }: UserIconProps) => {
  return (
    <Image
      height={height}
      width={height}
      radius={height / 2}
      src={userIcon}
      alt="user prof"
      withPlaceholder
      placeholder={<Avatar radius="xl" />}
    />
  )
}
