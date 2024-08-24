import { Flex, Title, Text, Progress } from '@mantine/core'
import { GetUserQuery } from '@/lib/generated/client'

type UserField = 'name' | 'description' | 'definition' | 'image'
const ratePerField = 25

interface ProgressBarProps {
  user: any
}

const USER_FIELDS: UserField[] = ['name', 'description', 'definition', 'image']
const USER_FIELD_LABELS = [
  'ユーザー名',
  '自己紹介文',
  'プロフィール画像',
  'タイプ',
]

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
    <>
      <Flex
        justify={{ base: 'center', md: 'flex-end' }}
        align="center"
        wrap="wrap"
      >
        <Title c="gray" fz={isCompleted ? '0.8rem' : '1.1rem'} mb={15}>
          {!isCompleted ? 'ユーザー情報入力完了率' : 'ユーザー情報コンプリート'}
          {!isCompleted && (
            <Text span c="orange" fz="1.5rem" pl={5} inherit>
              {completionRate}%
            </Text>
          )}
        </Title>
      </Flex>
      <Progress.Root size={isCompleted ? 10 : 20} mb={20} radius="lg">
        {USER_FIELDS.map(
          (field, index) =>
            user?.[field] && (
              <Progress.Section
                key={field}
                value={ratePerField}
                color={['yellow.6', 'orange.5', 'orange.6', 'orange.7'][index]}
              >
                <Progress.Label style={{ fontSize: '12px' }}>
                  {USER_FIELD_LABELS[index]}
                </Progress.Label>
              </Progress.Section>
            )
        )}
      </Progress.Root>
    </>
  )
}
