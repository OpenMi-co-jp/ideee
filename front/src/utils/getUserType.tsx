import { Badge, BadgeProps, Group, Text } from '@mantine/core'
import React from 'react'
import { IconCode, IconBulb, IconBulbFilled } from '@tabler/icons-react'

type UserTypeValue = 'engineer' | 'idea_man' | 'idea_man_and_engineer'
type UserTypeName = 'エンジニア' | 'アイデアマン' | 'アイデアマン兼エンジニア'

interface UserTypeConfig {
  label: UserTypeName
  color: BadgeProps['color']
  icon: React.ReactNode
  description?: string
}

// 各ユーザータイプの設定
const USER_TYPE_CONFIG: Record<UserTypeValue, UserTypeConfig> = {
  engineer: {
    label: 'エンジニア',
    color: 'blue',
    icon: <IconCode size={16} />,
    description: '技術的な実装を担当',
  },
  idea_man: {
    label: 'アイデアマン',
    color: 'green',
    icon: <IconBulb size={16} />,
    description: 'アイデアの発案を担当',
  },
  idea_man_and_engineer: {
    label: 'アイデアマン兼エンジニア',
    color: 'violet',
    icon: <IconBulbFilled size={16} />,
    description: 'アイデアと実装の両方を担当',
  },
}

// 元の関数を維持（互換性のため）
export const getUserType = (definition: string | undefined): UserTypeName => {
  switch (definition) {
    case 'engineer':
      return 'エンジニア'
    case 'idea_man':
      return 'アイデアマン'
    default:
      return 'アイデアマン兼エンジニア'
  }
}

// 文字列だけを返す関数 (追加機能)
export const getUserTypeName = getUserType

// 単純なBadgeコンポーネント
export const UserTypeBadge: React.FC<{
  userType: string | undefined
  size?: BadgeProps['size']
  radius?: BadgeProps['radius']
  variant?: BadgeProps['variant']
  withIcon?: boolean
}> = ({
  userType,
  size = 'md',
  radius = 'sm',
  variant = 'filled',
  withIcon = true,
}) => {
  // 値が不正な場合のフォールバック
  const normalizedType = userType as UserTypeValue
  const typeKey = ['engineer', 'idea_man', 'idea_man_and_engineer'].includes(
    normalizedType
  )
    ? normalizedType
    : 'idea_man_and_engineer'

  const config = USER_TYPE_CONFIG[typeKey]

  return (
    <Badge
      color={config.color}
      size={size}
      radius={radius}
      variant={variant}
      leftSection={withIcon ? config.icon : null}
    >
      {config.label}
    </Badge>
  )
}

// リッチな表示用コンポーネント（アイコン+バッジ+説明）
export const UserTypeDisplay: React.FC<{
  userType: string | undefined
  showDescription?: boolean
}> = ({ userType, showDescription = false }) => {
  const normalizedType = userType as UserTypeValue
  const typeKey = ['engineer', 'idea_man', 'idea_man_and_engineer'].includes(
    normalizedType
  )
    ? normalizedType
    : 'idea_man_and_engineer'

  const config = USER_TYPE_CONFIG[typeKey]

  return (
    <Group gap="xs">
      {config.icon}
      <UserTypeBadge userType={typeKey} withIcon={false} />
      {showDescription && config.description && (
        <Text size="sm" color="dimmed">
          {config.description}
        </Text>
      )}
    </Group>
  )
}

// 互換性のためにデフォルトエクスポートも提供
export default UserTypeBadge
