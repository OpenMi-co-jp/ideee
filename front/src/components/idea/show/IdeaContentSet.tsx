import { Paper, Space, Stack, Text, Title } from '@mantine/core'

export const IdeaContentSet = ({
  label,
  content,
}: {
  label: string
  content?: string | null
}) => {
  if (!content) return null

  return (
    <Stack gap="xs">
      <Space h="xl" />
      <Title order={4} size="lg" c="gray" ml="md">
        {label}
      </Title>
      <Paper shadow="xs" p="md">
        <Text>{content}</Text>
      </Paper>
    </Stack>
  )
}
