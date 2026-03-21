import { Box, Flex, Text, Progress, ThemeIcon, Group } from '@mantine/core'
import { IconCheck, IconCircle } from '@tabler/icons-react'
import { GetUserQuery } from '@/lib/generated/client'

type UserField = 'name' | 'description' | 'definition' | 'image'
const ratePerField = 25

interface ProgressBarProps {
  user: any
}

const USER_FIELDS: UserField[] = ['name', 'description', 'definition', 'image']
const USER_FIELD_LABELS: Record<UserField, string> = {
  name: 'ユーザー名',
  description: '自己紹介文',
  definition: 'タイプ',
  image: 'プロフィール画像',
}

const calculateCompletionRate = (
  user: GetUserQuery['user'] | undefined
): number => {
  return USER_FIELDS.reduce(
    (acc, field) => (user?.[field] ? acc + ratePerField : acc),
    0
  )
}

export const ProgressBar = ({ user }: ProgressBarProps) => {
  const completionRate = calculateCompletionRate(user)
  const isCompleted = completionRate === 100

  return (
    <Box
      p={{ base: 'md', sm: 'lg' }}
      style={{
        background: isCompleted
          ? 'linear-gradient(135deg, #d3f9d8 0%, #b2f2bb 100%)'
          : 'linear-gradient(135deg, #fff9db 0%, #ffec99 100%)',
        borderRadius: '12px',
        border: isCompleted ? '1px solid #69db7c' : '1px solid #fcc419',
      }}
    >
      {/* ヘッダー：完了率表示 */}
      <Flex
        justify="space-between"
        align="center"
        mb="sm"
        direction={{ base: 'column', xs: 'row' }}
        gap="xs"
      >
        <Text
          fw={600}
          fz={{ base: 'sm', sm: 'md' }}
          c={isCompleted ? 'green.8' : 'dark.6'}
        >
          {isCompleted ? 'プロフィール完成!' : 'プロフィール入力状況'}
        </Text>
        <Text
          fw={700}
          fz={{ base: 'xl', sm: '1.5rem' }}
          c={isCompleted ? 'green.7' : 'orange.6'}
        >
          {completionRate}%
        </Text>
      </Flex>

      {/* プログレスバー */}
      <Progress
        value={completionRate}
        size={{ base: 8, sm: 10 }}
        radius="xl"
        color={isCompleted ? 'green.6' : 'orange.5'}
        mb="md"
        styles={{
          root: {
            backgroundColor: isCompleted
              ? 'rgba(255,255,255,0.6)'
              : 'rgba(255,255,255,0.7)',
          },
        }}
      />

      {/* 項目チェックリスト */}
      <Group gap={{ base: 'xs', sm: 'md' }} justify="center" wrap="wrap">
        {USER_FIELDS.map((field) => {
          const isFieldCompleted = !!user?.[field]
          return (
            <Flex
              key={field}
              align="center"
              gap={4}
              style={{ opacity: isFieldCompleted ? 1 : 0.5 }}
            >
              <ThemeIcon
                size={18}
                radius="xl"
                color={isFieldCompleted ? 'green' : 'gray'}
                variant={isFieldCompleted ? 'filled' : 'light'}
              >
                {isFieldCompleted ? (
                  <IconCheck size={12} stroke={3} />
                ) : (
                  <IconCircle size={12} />
                )}
              </ThemeIcon>
              <Text fz={{ base: 'xs', sm: 'sm' }} c={isFieldCompleted ? 'dark.6' : 'gray.6'}>
                {USER_FIELD_LABELS[field]}
              </Text>
            </Flex>
          )
        })}
      </Group>
    </Box>
  )
}
