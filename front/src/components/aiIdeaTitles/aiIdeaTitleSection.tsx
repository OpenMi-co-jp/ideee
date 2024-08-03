import { Paper, Flex, Title } from '@mantine/core'
import { IconBulb } from '@tabler/icons-react'
import { AiIdeaTitleList } from './aiIdeaTitleList'

export const AiIdeaTitleSection: React.FC = () => {
  return (
    <Paper
      shadow="xs"
      radius="lg"
      py="xl"
      my="xl"
      style={{ border: 'thick double #FFCCCB' }}
    >
      <Flex justify="left" align="center" direction="row" wrap="nowrap" mx="xl">
        <Paper shadow="sm" radius="md" p="sm">
          <IconBulb size={30} stroke={1.5} />
        </Paper>
        <Title order={2} mx="md" my="md" c="red">
          アイデアのヒント
        </Title>
      </Flex>
      <AiIdeaTitleList />
    </Paper>
  )
}
