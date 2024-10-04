import { Text, Title } from '@mantine/core'

type TeamContentProps = {
  title: string
  content: string
}
export const TeamContent = ({ title, content }: TeamContentProps) => (
  <>
    <Title
      size="h4"
      fw={600}
      p={10}
      style={{ borderLeft: '5px solid #FD7E13' }}
    >
      {title}
    </Title>
    <Text p={6} mb="xl">
      {content}
    </Text>
  </>
)
