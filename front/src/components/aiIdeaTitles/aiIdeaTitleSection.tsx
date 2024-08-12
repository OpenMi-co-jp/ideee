import { Paper, Flex, Text, Title } from '@mantine/core'
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
        <div>
          <Title order={2} mx="md" c="red">
            今日のアイデアヒント
          </Title>
          <Text mx="md">
            下記ヒントから三つをクリックし、アイデアが作成できます！
          </Text>
        </div>
      </Flex>
      <AiIdeaTitleList />
    </Paper>
  )
}
